import { LocalStorageAdapter } from '@infra/cache'
import { setCurrentAccountAdapter } from '@main/adapters/current-account-adapter'

jest.mock('@infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

  it('should call LocalStorageAdapter with correct values', () => {
    const account = { accessToken: 'any_token', name: 'any_name' }
    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
