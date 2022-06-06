import { HttpPostClient } from '@data/protocols'
import { RemoteAuthentication } from '@data/usecases'
import { AuthenticationParams } from '@domain/usecases'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  let url: string
  let authParams: AuthenticationParams
  const httpPostClientSpy = mock<HttpPostClient>()

  beforeAll(() => {
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
})
