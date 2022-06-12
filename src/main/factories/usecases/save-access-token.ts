import { LocalSaveAccessToken } from '@data/usecases'
import { SaveAccessToken } from '@domain/usecases'
import { makeLocalStorageAdapter } from '@main/factories/cache'

export const makeSaveAccessToken = (): SaveAccessToken => new LocalSaveAccessToken(makeLocalStorageAdapter())
