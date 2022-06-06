import { HttpPostClient, HttpPostParams, HttpResponse } from '@data/protocols'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post ({ url, body }: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const { status, data } = await axios.post(url, body)
    return {
      statusCode: status,
      body: data
    }
  }
}
