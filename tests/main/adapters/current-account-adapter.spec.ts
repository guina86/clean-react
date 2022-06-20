import { UnexpectedError } from '@domain/errors'
import { LocalStorageAdapter } from '@infra/cache'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@main/adapters/current-account-adapter'

jest.mock('@infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  const accountMock = { accessToken: 'any_token', name: 'any_name' }

  it('should call LocalStorageAdapter.set with correct values', () => {
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(accountMock)

    expect(setSpy).toHaveBeenCalledWith('account', accountMock)
  })

  it('should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })

  it('should call LocalStorageAdapter.get with correct values', () => {
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(accountMock)
    const account = getCurrentAccountAdapter()

    expect(getSpy).toHaveBeenCalledWith('account')
    expect(account).toEqual(accountMock)
  })
})
