import { HttpPostClient } from '@data/protocols'
import { RemoteAuthentication } from '@data/usecases'
import { mock } from 'jest-mock-extended'

describe('RemoteAuthentication', () => {
  it('should ', async () => {
    const url = 'any_url'
    const httpPostClientSpy = mock<HttpPostClient>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    await sut.auth()

    expect(httpPostClientSpy.post).toHaveBeenCalledWith(url)
  })
})
