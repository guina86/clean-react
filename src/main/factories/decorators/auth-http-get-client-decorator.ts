import { HttpGetClient } from '@data/protocols'
import { AuthHttpGetClientDecorator } from '@main/decorators'
import { makeLocalStorageAdapter } from '@main/factories/cache'
import { makeAxiosHttpClient } from '@main/factories/http'

export const makeAuthHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
