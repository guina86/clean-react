import { GetStorage, HttpGetClient } from '@data/protocols'
import { AuthHttpGetClientDecorator } from '@main/decorators/auth-http-get-client-decorator'
import { mock } from 'jest-mock-extended'

describe('AuthHttpGetClientDecorator', () => {
  let sut: AuthHttpGetClientDecorator
  const getStorageSpy = mock<GetStorage>()
  const httpGetClientSpy = mock<HttpGetClient>()

  beforeEach(() => {
    sut = new AuthHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
  })

  it('should call GetStorage with correct value', async () => {
    await sut.get({ url: 'any_url', headers: { any: 'any' } })
    expect(getStorageSpy.get).toHaveBeenCalledWith('account')
  })

  it('should not add headers if getStorage is invalid', async () => {
    const request = { url: 'any_url', headers: { any: 'any' } }
    await sut.get(request)
    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url: request.url, headers: { any: 'any' } })
  })

  it('should add headers to HttpGetClient', async () => {
    getStorageSpy.get.mockReturnValueOnce({ accessToken: 'any_token', name: 'any_name' })
    const request = { url: 'any_url' }
    await sut.get(request)
    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url: request.url, headers: { 'x-access-token': 'any_token' } })
  })

  it('should merge headers to HttpGetClient', async () => {
    getStorageSpy.get.mockReturnValueOnce({ accessToken: 'any_token', name: 'any_name' })
    const request = { url: 'any_url', headers: { any: 'any' } }
    await sut.get(request)
    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url: request.url, headers: { any: 'any', 'x-access-token': 'any_token' } })
  })

  it('should return the same result as HttpGetClient', async () => {
    const mockResult = { statusCode: 200, body: { data: 'any_data' } }
    httpGetClientSpy.get.mockResolvedValueOnce(mockResult)
    const request = { url: 'any_url', headers: { any: 'any' } }
    const response = await sut.get(request)
    expect(response).toEqual(mockResult)
  })
})
