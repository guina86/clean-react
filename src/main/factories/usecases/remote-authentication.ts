import { RemoteAuthentication } from '@data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@main/factories/http'

export const makeRemoteAuthentication = (): RemoteAuthentication =>
  new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
