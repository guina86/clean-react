import { HttpPostClient, HttpPostParams, HttpResponse } from '@data/protocols'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post ({ url, body }: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(url, body)
    } catch (error) {
      httpResponse = (error as AxiosError).response!
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
