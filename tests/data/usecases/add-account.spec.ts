import { HttpPostClient, HttpStatusCode } from '@data/protocols'
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
  const httpPostClientSpy = mock<HttpPostClient<AddAccount.Result>>()

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
    httpPostClientSpy.post.mockResolvedValue({ statusCode: HttpStatusCode.ok, body: account })
  })

  beforeEach(() => {
    sut = new RemoteAddAccount(url, httpPostClientSpy)
  })

  it('should call HttpPostClient with correct url and body', async () => {
    await sut.add(addParams)

    expect(httpPostClientSpy.post).toHaveBeenCalledWith({ url, body: addParams })
  })

  it('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an account on success', async () => {
    const newAccount = await sut.add(addParams)

    expect(newAccount).toEqual(account)
  })
})
