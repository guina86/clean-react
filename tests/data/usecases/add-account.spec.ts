import { HttpPostClient, HttpStatusCode } from '@data/protocols'
import { RemoteAddAccount } from '@data/usecases'
import { EmailInUseError, UnexpectedError } from '@domain/errors'
import { AccountModel } from '@domain/model'
import { AddAccountParams } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteAddAccount', () => {
  let sut: RemoteAddAccount
  let url: string
  let addParams: AddAccountParams
  let accessToken: string
  const httpPostClientSpy = mock<HttpPostClient<AddAccountParams, AccountModel>>()

  beforeAll(() => {
    url = faker.internet.url()
    const password = faker.internet.password()
    addParams = {
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
    const account = await sut.add(addParams)

    expect(account).toEqual({ accessToken })
  })
})
