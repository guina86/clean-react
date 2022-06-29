import { RemoteLoadSurveyResult } from '@data/usecases'
import { HttpClient, HttpStatusCode } from '@data/protocols'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { mockRemoteSurveyResult } from '@tests/data/mocks'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteLoadSurveyResult', () => {
  const makeSut = (): RemoteLoadSurveyResult => new RemoteLoadSurveyResult(url, httpClientSpy)
  const httpClientSpy = mock<HttpClient>()
  const url = faker.internet.url()
  const remoteSurveyResultMock = mockRemoteSurveyResult()

  beforeAll(() => {
    httpClientSpy.request.mockResolvedValue({ statusCode: 200, body: remoteSurveyResultMock })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call HttpClient with correct URL and method', async () => {
    const sut = makeSut()

    await sut.load()

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, method: 'get' })
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a surveyResult on 200', async () => {
    const sut = makeSut()
    const surveyResultMock = { ...remoteSurveyResultMock, date: new Date(remoteSurveyResultMock.date) }

    const surveyResult = await sut.load()

    expect(surveyResult).toEqual(surveyResultMock)
  })
})
