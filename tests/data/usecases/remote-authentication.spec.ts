import { RemoteAuthentication } from '@data/usecases'
import { HttpClient, HttpStatusCode } from '@data/protocols'
import { InvalidCredentialsError, UnexpectedError } from '@domain/errors'
import { AddAccount } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteAuthentication', () => {
  const makeSut = (): RemoteAuthentication => new RemoteAuthentication(url, httpClientSpy)
  const httpClientSpy = mock<HttpClient<AddAccount.Result>>()
  const url = faker.internet.url()
  const accessToken = faker.datatype.uuid()
  const name = faker.name.findName()
  const authParams = {
    email: faker.internet.email(),
    password: faker.internet.password()
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

    await sut.auth(authParams)

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, body: authParams, method: 'post' })
  })

  it('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.unauthorized })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an account on success', async () => {
    const sut = makeSut()

    const authAccount = await sut.auth(authParams)

    expect(authAccount).toEqual(account)
  })
})
