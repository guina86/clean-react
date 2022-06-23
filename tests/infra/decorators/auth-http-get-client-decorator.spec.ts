import { GetStorage } from '@data/protocols'
import { AuthHttpGetClientDecorator } from '@main/decorators/auth-http-get-client-decorator'
import { mock } from 'jest-mock-extended'

describe('AuthHttpGetClientDecorator', () => {
  const getStorageSpy = mock<GetStorage>()

  it('should call GetStorage with correct value', async () => {
    const sut = new AuthHttpGetClientDecorator(getStorageSpy)
    await sut.get({ url: 'any_url', headers: { any: 'any' } })
    expect(getStorageSpy.get).toHaveBeenCalledWith('account')
  })
})
