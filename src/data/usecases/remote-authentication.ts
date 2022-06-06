import { HttpPostClient, HttpStatusCode } from '@data/protocols'
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
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
    }
  }
}
