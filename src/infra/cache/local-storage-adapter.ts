import { GetStorage, SetStorage } from '@data/protocols'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get (key: string): any {
    const result = localStorage.getItem(key)
    if (!result) throw new Error('item not found on localStorage')
    return JSON.parse(result)
  }
}
