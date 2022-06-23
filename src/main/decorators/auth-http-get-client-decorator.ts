import { GetStorage, HttpGetClient, HttpGetParams, HttpResponse } from '@data/protocols'

export class AuthHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account')
    await this.httpGetClient.get(params)
    return { statusCode: 0, body: {} }
  }
}
