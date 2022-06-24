import { GetStorage, SetStorage } from '@data/protocols'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value?: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get (key: string): any | null {
    const result = localStorage.getItem(key)
    return result ? JSON.parse(result) : null
  }
}
