import { AxiosHttpClient } from '@infra/http'
import { HttpMethod } from '@data/protocols'
import axios from 'axios'
import { faker } from '@faker-js/faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  const makeSut = (): AxiosHttpClient => new AxiosHttpClient()
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const request = {
    url: faker.internet.url(),
    body: { any: 'data' },
    headers: { any: 'any_header' },
    method: faker.helpers.arrayElement(['post', 'get', 'put', 'delete']) as HttpMethod
  }

  beforeAll(() => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: 'any_data' })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call axios with correct values', async () => {
    const sut = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  it('should return correct response on axios', async () => {
    const sut = makeSut()

    const httpResponse = await sut.request(request)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: 'any_data'
    })
  })

  it('should return the correct error on axios', async () => {
    const sut = makeSut()
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
