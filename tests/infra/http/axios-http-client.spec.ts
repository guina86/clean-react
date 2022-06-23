import { AxiosHttpClient } from '@infra/http'
import axios from 'axios'
import { faker } from '@faker-js/faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  const url = faker.internet.url()
  const body = { any: 'data' }
  const headers = { any: 'any_header' }
  const mockedAxios = axios as jest.Mocked<typeof axios>

  describe('post()', () => {
    beforeAll(() => {
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

  describe('get()', () => {
    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: 'any_data' })
    })

    beforeEach(() => {
      sut = new AxiosHttpClient()
    })

    it('should call axios.get with correct values', async () => {
      await sut.get({ url, headers })

      expect(mockedAxios.get).toHaveBeenCalledWith(url, { headers: headers })
    })

    it('should return correct response on axios.get', async () => {
      const httpResponse = await sut.get({ url })

      expect(httpResponse).toEqual({
        statusCode: 200,
        body: 'any_data'
      })
    })

    it('should return the correct error on axios.get', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          data: 'any_data',
          status: 'any_status'
        }
      })
      const httpResponse = await sut.get({ url })

      expect(httpResponse).toEqual({
        statusCode: 'any_status',
        body: 'any_data'
      })
    })
  })
})
