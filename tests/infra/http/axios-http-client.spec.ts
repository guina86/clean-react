import { AxiosHttpClient } from '@infra/http'
import axios from 'axios'
import { faker } from '@faker-js/faker'
import { HttpPostParams } from '@data/protocols'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let url: string
  let body: any
  let postParams: HttpPostParams<any>
  const mockedAxios = jest.mocked(axios)

  beforeAll(() => {
    url = faker.internet.url()
    body = { any: 'thing' }
    postParams = { url, body }
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('should call axios with correct values', async () => {
    await sut.post(postParams)
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })
})
