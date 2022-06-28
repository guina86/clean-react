import { GetStorage, HttpClient, HttpRequest, HttpResponse } from '@data/protocols'

export class AuthHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      data.headers = { ...data.headers, 'x-access-token': account.accessToken }
    }
    const result = await this.httpClient.request(data)
    return result
  }
}
