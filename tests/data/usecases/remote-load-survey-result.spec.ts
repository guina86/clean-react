import { HttpGetClient } from '@data/protocols'
import { RemoteLoadSurveyResult } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteLoadSurveyResult', () => {
  const httpGetClientSpy = mock<HttpGetClient>()
  const url = faker.internet.url()
  const makeSut = (): RemoteLoadSurveyResult => new RemoteLoadSurveyResult(url, httpGetClientSpy)

  it('should call HttpGetClient with correct URL', async () => {
    const sut = makeSut()
    await sut.load()
    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url })
  })
})
