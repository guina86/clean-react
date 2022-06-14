import { RemoteAddAccount } from '@data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@main/factories/http'

export const makeRemoteAddAccount = (): RemoteAddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
