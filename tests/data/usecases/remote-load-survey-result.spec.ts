import { HttpGetClient, HttpStatusCode } from '@data/protocols'
import { RemoteLoadSurveyResult } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { AccessDeniedError } from '@domain/errors'
import { mockRemoteSurveyResult } from '../mocks/survey'

describe('RemoteLoadSurveyResult', () => {
  const httpGetClientSpy = mock<HttpGetClient>()
  const mockedSurveyResult = mockRemoteSurveyResult()
  const url = faker.internet.url()
  const makeSut = (): RemoteLoadSurveyResult => new RemoteLoadSurveyResult(url, httpGetClientSpy)

  beforeAll(() => {
    httpGetClientSpy.get.mockResolvedValue({ statusCode: 200, body: mockedSurveyResult })
  })

  it('should call HttpGetClient with correct URL', async () => {
    const sut = makeSut()
    await sut.load()
    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url })
  })

  it('should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const sut = makeSut()
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
