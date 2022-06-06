import { HttpPostClient, HttpStatusCode } from '@data/protocols'
import { UnexpectedError } from '@domain/errors'
import { InvalidCredentialsError } from '@domain/errors/invalid-credentias-error'
import { AuthenticationParams } from '@domain/usecases'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.noContent: break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
