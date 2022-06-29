import { HttpClient } from '@data/protocols'
import { RemoteSaveSurveyResult } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { mockRemoteSurveyResult } from '../mocks/survey'

describe('RemoteSaveSurveyResult', () => {
  const httpClientSpy = mock<HttpClient>()
  const remoteSurveyResultMock = mockRemoteSurveyResult()
  const url = faker.internet.url()
  const makeSut = (): RemoteSaveSurveyResult => new RemoteSaveSurveyResult(url, httpClientSpy)

  beforeAll(() => {
    httpClientSpy.request.mockResolvedValue({ statusCode: 200, body: remoteSurveyResultMock })
  })

  it('should call HttpClient with correct URL, body and method', async () => {
    const sut = makeSut()
    await sut.save({ answer: 'any_answer' })
    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, body: { answer: 'any_answer' }, method: 'put' })
  })
})
