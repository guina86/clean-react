import { AxiosHttpClient } from '@infra/http'
import axios from 'axios'
import { faker } from '@faker-js/faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let url: string
  let body: any
  const mockedAxios = axios as jest.Mocked<typeof axios>

  beforeAll(() => {
    url = faker.internet.url()
    body = { any: 'data' }
    mockedAxios.post.mockResolvedValue({ status: 200, data: 'any_data' })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('should call axios with correct values', async () => {
    await sut.post({ url, body })
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })

  it('should return the correct statusCode and body', async () => {
    const httpResponse = await sut.post({ url, body })
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: 'any_data'
    })
  })
})
