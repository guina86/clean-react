import { GetStorage, HttpClient } from '@data/protocols'
import { AuthHttpClientDecorator } from '@main/decorators/auth-http-client-decorator'
import { mock } from 'jest-mock-extended'

describe('AuthHttpGetClientDecorator', () => {
  let sut: AuthHttpClientDecorator
  const getStorageSpy = mock<GetStorage>()
  const httpClientSpy = mock<HttpClient>()

  beforeEach(() => {
    sut = new AuthHttpClientDecorator(getStorageSpy, httpClientSpy)
  })

  it('should call GetStorage with correct value', async () => {
    await sut.request({ url: 'any_url', headers: { any: 'any' }, method: 'delete' })
    expect(getStorageSpy.get).toHaveBeenCalledWith('account')
  })

  it('should not add headers if getStorage is invalid', async () => {
    await sut.request({ url: 'any_url', headers: { any: 'any' }, method: 'get' })
    expect(httpClientSpy.request).toHaveBeenCalledWith({ url: 'any_url', headers: { any: 'any' }, method: 'get' })
  })

  it('should add headers to HttpClient', async () => {
    getStorageSpy.get.mockReturnValueOnce({ accessToken: 'any_token', name: 'any_name' })
    await sut.request({ url: 'any_url', method: 'post' })
    expect(httpClientSpy.request).toHaveBeenCalledWith({ url: 'any_url', headers: { 'x-access-token': 'any_token' }, method: 'post' })
  })

  it('should merge headers to HttpClient', async () => {
    getStorageSpy.get.mockReturnValueOnce({ accessToken: 'any_token', name: 'any_name' })
    await sut.request({ url: 'any_url', headers: { any: 'any' }, method: 'put' })
    expect(httpClientSpy.request).toHaveBeenCalledWith({ url: 'any_url', headers: { any: 'any', 'x-access-token': 'any_token' }, method: 'put' })
  })

  it('should return the same result as HttpClient', async () => {
    const mockResult = { statusCode: 200, body: { data: 'any_data' } }
    httpClientSpy.request.mockResolvedValueOnce(mockResult)
    const response = await sut.request({ url: 'any_url', headers: { any: 'any' }, method: 'get' })
    expect(response).toEqual(mockResult)
  })
})
