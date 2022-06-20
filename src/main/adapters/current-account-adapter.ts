import { UnexpectedError } from '@domain/errors'
import { AccountModel } from '@domain/model'
import { makeLocalStorageAdapter } from '@main/factories/cache'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (account?.accessToken === undefined) throw new UnexpectedError()
  makeLocalStorageAdapter().set('account', account)
}
