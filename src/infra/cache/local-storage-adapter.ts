import { SetStorage } from '@data/protocols'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: any): void {
    localStorage.setItem(key, value)
  }
}
