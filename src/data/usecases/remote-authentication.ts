import { HttpPostClient, HttpStatusCode } from '@data/protocols'
import { UnexpectedError } from '@domain/errors'
import { InvalidCredentialsError } from '@domain/errors/invalid-credentias-error'
import { AccountModel } from '@domain/model'
import { Authentication, AuthenticationParams } from '@domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body!
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
