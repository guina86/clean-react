import { LocalStorageAdapter } from '@infra/cache/local-storage-adapter'
import 'jest-localstorage-mock'

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter
  const value = { any_key: 'any_value' }

  beforeEach(() => {
    localStorage.clear()
    sut = new LocalStorageAdapter()
  })

  it('should call localStorage.setItem with correct values', async () => {
    sut.set('any_key', value)

    expect(localStorage.setItem).toHaveBeenCalledWith('any_key', JSON.stringify(value))
  })

  it('should call localStorage.getItem with correct value', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get('any_key')
    expect(localStorage.getItem).toHaveBeenCalledWith('any_key')
    expect(obj).toEqual(value)
  })
})
