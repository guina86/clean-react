import { HttpClient, HttpRequest, HttpResponse } from '@data/protocols'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = (error as AxiosError).response!
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
