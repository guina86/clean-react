import { AxiosHttpClient } from '@infra/http'
import axios from 'axios'
import { faker } from '@faker-js/faker'
import { HttpMethod } from '@data/protocols'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  const request = {
    url: faker.internet.url(),
    body: { any: 'data' },
    headers: { any: 'any_header' },
    method: faker.helpers.arrayElement(['post', 'get', 'put', 'delete']) as HttpMethod
  }
  const mockedAxios = axios as jest.Mocked<typeof axios>

  beforeAll(() => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: 'any_data' })
  })

  it('should call axios with correct values', async () => {
    const sut = new AxiosHttpClient()
    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  it('should return correct response on axios', async () => {
    const sut = new AxiosHttpClient()
    const httpResponse = await sut.request(request)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: 'any_data'
    })
  })

  it('should return the correct error on axios', async () => {
    const sut = new AxiosHttpClient()
    mockedAxios.request.mockRejectedValueOnce({
      response: {
        data: 'any_data',
        status: 'any_status'
      }
    })
    const httpResponse = await sut.request(request)

    expect(httpResponse).toEqual({
      statusCode: 'any_status',
      body: 'any_data'
    })
  })
})
