import { HttpPostClient, HttpPostParams, HttpResponse } from '@data/protocols'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse
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
