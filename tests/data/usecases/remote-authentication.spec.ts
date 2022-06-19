import { HttpPostClient, HttpStatusCode } from '@data/protocols'
import { RemoteAuthentication } from '@data/usecases'
import { AuthenticationParams } from '@domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@domain/errors'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'
import { AccountModel } from '@domain/model'

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let authParams: AuthenticationParams
  let accessToken: string
  let name: string
  let account: AccountModel
  const httpPostClientSpy = mock<HttpPostClient<AccountModel>>()

  beforeAll(() => {
    url = faker.internet.url()
    authParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    name = faker.name.findName()
    accessToken = faker.datatype.uuid()
    account = { accessToken, name }
    httpPostClientSpy.post.mockResolvedValue({ statusCode: HttpStatusCode.ok, body: account })
  })

  beforeEach(() => {
    sut = new RemoteAuthentication(url, httpPostClientSpy)
  })

  it('should call HttpPostClient with correct url and body', async () => {
    await sut.auth(authParams)

    expect(httpPostClientSpy.post).toHaveBeenCalledWith({ url, body: authParams })
  })

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.unauthorized })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    httpPostClientSpy.post.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an account on success', async () => {
    const authAccount = await sut.auth(authParams)

    expect(authAccount).toEqual(account)
  })
})
