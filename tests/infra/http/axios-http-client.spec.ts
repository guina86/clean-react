import { AxiosHttpClient } from '@infra/http'
import axios from 'axios'
import { faker } from '@faker-js/faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  describe('POST', () => {
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

    it('should call axios.post with correct values', async () => {
      await sut.post({ url, body })
      expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
    })

    it('should return correct response on axios.post', async () => {
      const httpResponse = await sut.post({ url, body })
      expect(httpResponse).toEqual({
        statusCode: 200,
        body: 'any_data'
      })
    })

    it('should return the correct error on axios.post', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: 'any_data',
          status: 'any_status'
        }
      })
      const httpResponse = await sut.post({ url, body })
      expect(httpResponse).toEqual({
        statusCode: 'any_status',
        body: 'any_data'
      })
    })
  })
})
