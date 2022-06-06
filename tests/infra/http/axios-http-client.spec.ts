import { AxiosHttpClient } from '@infra/http'
import axios from 'axios'
import { faker } from '@faker-js/faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let url: string
  const mockedAxios = jest.mocked(axios)

  beforeAll(() => {
    url = faker.internet.url()
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('should call axios with correct url and verb', async () => {
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
