import { HttpClient, HttpStatusCode } from '@data/protocols'
import { EmailInUseError, UnexpectedError } from '@domain/errors'
import { AddAccount } from '@domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AddAccount.Result>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body!
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
