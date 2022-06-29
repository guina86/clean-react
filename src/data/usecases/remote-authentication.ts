import { HttpClient, HttpStatusCode } from '@data/protocols'
import { UnexpectedError, InvalidCredentialsError } from '@domain/errors'
import { Authentication } from '@domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<Authentication.Result>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body!
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
