import { HttpPostClient, HttpStatusCode } from '@data/protocols'
import { RemoteAuthentication } from '@data/usecases'
import { AuthenticationParams } from '@domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@domain/errors'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let authParams: AuthenticationParams
  const httpPostClientSpy = mock<HttpPostClient>()

  beforeAll(() => {
    httpPostClientSpy.post.mockResolvedValue({ statusCode: HttpStatusCode.ok })
    url = faker.internet.url()
    authParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
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
})
