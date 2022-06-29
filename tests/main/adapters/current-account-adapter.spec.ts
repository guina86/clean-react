import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@main/adapters/current-account-adapter'
import { LocalStorageAdapter } from '@infra/cache'

jest.mock('@infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  const accountMock = { accessToken: 'any_token', name: 'any_name' }

  it('should call LocalStorageAdapter.set with correct values', () => {
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(accountMock)

    expect(setSpy).toHaveBeenCalledWith('account', accountMock)
  })

  it('should call LocalStorageAdapter.get with correct values', () => {
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(accountMock)

    const account = getCurrentAccountAdapter()

    expect(getSpy).toHaveBeenCalledWith('account')
    expect(account).toEqual(accountMock)
  })
})
