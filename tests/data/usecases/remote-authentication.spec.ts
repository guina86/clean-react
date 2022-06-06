import { HttpPostClient } from '@data/protocols'
import { RemoteAuthentication } from '@data/usecases'
import { mock } from 'jest-mock-extended'

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication
  const url = 'any_url'
  const httpPostClientSpy = mock<HttpPostClient>()

  beforeEach(() => {
    sut = new RemoteAuthentication(url, httpPostClientSpy)
  })

  it('should ', async () => {
    await sut.auth()

    expect(httpPostClientSpy.post).toHaveBeenCalledWith(url)
  })
})
