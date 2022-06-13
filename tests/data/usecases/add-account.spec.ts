import { HttpPostClient, HttpStatusCode } from '@data/protocols'
import { RemoteAddAccount } from '@data/usecases'
import { AccountModel } from '@domain/model'
import { AddAccountParams } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteAddAccount', () => {
  let sut: RemoteAddAccount
  let url: string
  let authParams: AddAccountParams
  let accessToken: string
  const httpPostClientSpy = mock<HttpPostClient<AddAccountParams, AccountModel>>()

  beforeAll(() => {
    url = faker.internet.url()
    const password = faker.internet.password()
    authParams = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password
    }
    accessToken = faker.datatype.uuid()
    httpPostClientSpy.post.mockResolvedValue({ statusCode: HttpStatusCode.ok, body: { accessToken } })
  })

  beforeEach(() => {
    sut = new RemoteAddAccount(url, httpPostClientSpy)
  })

  it('should call HttpPostClient with correct url and body', async () => {
    await sut.add(authParams)

    expect(httpPostClientSpy.post).toHaveBeenCalledWith({ url, body: authParams })
  })
})
