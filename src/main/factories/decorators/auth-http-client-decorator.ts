import { HttpClient } from '@data/protocols'
import { AuthHttpClientDecorator } from '@main/decorators'
import { makeLocalStorageAdapter } from '@main/factories/cache'
import { makeAxiosHttpClient } from '@main/factories/http'

export const makeAuthHttpClientDecorator = (): HttpClient => {
  return new AuthHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
