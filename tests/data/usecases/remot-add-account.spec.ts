import { HttpClient, HttpStatusCode } from '@data/protocols'
import { RemoteAddAccount } from '@data/usecases'
import { EmailInUseError, UnexpectedError } from '@domain/errors'
import { AddAccount } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteAddAccount', () => {
  let sut: RemoteAddAccount
  let url: string
  let addParams: AddAccount.Params
  let accessToken: string
  let name: string
  let account: AddAccount.Result
  const httpClientSpy = mock<HttpClient<AddAccount.Result>>()

  beforeAll(() => {
    url = faker.internet.url()
    const password = faker.internet.password()
    accessToken = faker.datatype.uuid()
    name = faker.name.findName()
    addParams = {
      name: name,
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password
    }
    account = { accessToken, name }
    httpClientSpy.request.mockResolvedValue({ statusCode: HttpStatusCode.ok, body: account })
  })

  beforeEach(() => {
    sut = new RemoteAddAccount(url, httpClientSpy)
  })

  it('should call HttpClient with correct url, body and method', async () => {
    await sut.add(addParams)

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, body: addParams, method: 'post' })
  })

  it('should throw EmailInUseError if HttpClient returns 403', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an account on success', async () => {
    const newAccount = await sut.add(addParams)

    expect(newAccount).toEqual(account)
  })
})
