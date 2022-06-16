import { SetStorage } from '@data/protocols'
import { UnexpectedError } from '@domain/errors'
import { SaveAccessToken } from '@domain/usecases/save-access-token'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) {}

  async save (accessToken?: string): Promise<void> {
    if (accessToken === undefined) throw new UnexpectedError()
    await this.setStorage.set('accessToken', accessToken)
  }
}
