import { LocalStorageAdapter } from '@infra/cache/local-storage-adapter'
import 'jest-localstorage-mock'

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter

  beforeEach(() => {
    localStorage.clear()
    sut = new LocalStorageAdapter()
  })

  it('should call localStorage with correct values', async () => {
    sut.set('any_key', 'any_value')

    expect(localStorage.setItem).toHaveBeenCalledWith('any_key', 'any_value')
  })
})
