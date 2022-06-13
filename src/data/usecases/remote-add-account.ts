import { HttpPostClient } from '@data/protocols'
import { AccountModel } from '@domain/model'
import { AddAccount, AddAccountParams } from '@domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return { accessToken: '1234' }
  }
}
