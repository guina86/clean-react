import { HttpGetClient } from '@data/protocols'
import { RemoteLoadSurveyResult } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteLoadSurveyResult', () => {
  const httpGetClientSpy = mock<HttpGetClient>()
  let url: string

  beforeEach(() => {
    url = faker.internet.url()
  })

  it('should call HttpGetClient with correct URL', async () => {
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
    await sut.load()
    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url })
  })
})
