import { LocalStorageAdapter } from '@infra/cache/local-storage-adapter'
import 'jest-localstorage-mock'

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter

  beforeEach(() => {
    localStorage.clear()
    sut = new LocalStorageAdapter()
  })

  it('should call localStorage with correct values', async () => {
    const value = { any_key: 'any_value' }
    sut.set('any_key', value)

    expect(localStorage.setItem).toHaveBeenCalledWith('any_key', JSON.stringify(value))
  })
})
