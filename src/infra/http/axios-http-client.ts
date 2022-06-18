import { HttpPostClient, HttpPostParams, HttpResponse } from '@data/protocols'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(url, body)
    } catch (error) {
      axiosResponse = (error as AxiosError).response!
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
