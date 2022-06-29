import { RemoteAddAccount } from '@data/usecases'
import { HttpClient, HttpStatusCode } from '@data/protocols'
import { EmailInUseError, UnexpectedError } from '@domain/errors'
import { AddAccount } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteAddAccount', () => {
  const makeSut = (): RemoteAddAccount => new RemoteAddAccount(url, httpClientSpy)
  const httpClientSpy = mock<HttpClient<AddAccount.Result>>()
  const url = faker.internet.url()
  const accessToken = faker.datatype.uuid()
  const name = faker.name.findName()
  const password = faker.internet.password()
  const addParams = {
    name: name,
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password
  }
  const account = { accessToken, name }

  beforeAll(() => {
    httpClientSpy.request.mockResolvedValue({ statusCode: HttpStatusCode.ok, body: account })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call HttpClient with correct url, body and method', async () => {
    const sut = makeSut()

    await sut.add(addParams)

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, body: addParams, method: 'post' })
  })

  it('should throw EmailInUseError if HttpClient returns 403', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.add(addParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an account on success', async () => {
    const sut = makeSut()

    const newAccount = await sut.add(addParams)

    expect(newAccount).toEqual(account)
  })
})
