import { GetStorage, HttpGetClient, HttpGetParams, HttpResponse } from '@data/protocols'

export class AuthHttpGetClientDecorator implements HttpGetClient {
  constructor (private readonly getStorage: GetStorage) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account')
    return { statusCode: 0, body: {} }
  }
}
