import { SetStorage } from '@data/protocols'
import { UnexpectedError } from '@domain/errors'
import { AccountModel } from '@domain/model'
import { UpdateCurrentAccount } from '@domain/usecases/update-current-account'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  async save (account?: AccountModel): Promise<void> {
    if (account?.accessToken === undefined) throw new UnexpectedError()
    await this.setStorage.set('account', JSON.stringify(account))
  }
}
