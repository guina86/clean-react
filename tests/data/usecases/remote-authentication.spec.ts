import { HttpClient, HttpStatusCode } from '@data/protocols'
import { RemoteAuthentication } from '@data/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@domain/errors'
import { AddAccount, Authentication } from '@domain/usecases'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let authParams: Authentication.Params
  let accessToken: string
  let name: string
  let account: AddAccount.Result
  const httpClientSpy = mock<HttpClient<AddAccount.Result>>()

  beforeAll(() => {
    url = faker.internet.url()
    authParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    name = faker.name.findName()
    accessToken = faker.datatype.uuid()
    account = { accessToken, name }
    httpClientSpy.request.mockResolvedValue({ statusCode: HttpStatusCode.ok, body: account })
  })

  beforeEach(() => {
    sut = new RemoteAuthentication(url, httpClientSpy)
  })

  it('should call HttpClient with correct url, body and method', async () => {
    await sut.auth(authParams)

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, body: authParams, method: 'post' })
  })

  it('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.unauthorized })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an account on success', async () => {
    const authAccount = await sut.auth(authParams)

    expect(authAccount).toEqual(account)
  })
})
