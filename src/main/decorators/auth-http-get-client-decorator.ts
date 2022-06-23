import { GetStorage, HttpGetClient, HttpGetParams, HttpResponse } from '@data/protocols'

export class AuthHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      params.headers = { ...params.headers, 'x-access-token': account.accessToken }
    }
    const result = await this.httpGetClient.get(params)
    return result
  }
}
