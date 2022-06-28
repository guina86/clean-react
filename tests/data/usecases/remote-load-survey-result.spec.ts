import { HttpClient, HttpStatusCode } from '@data/protocols'
import { RemoteLoadSurveyResult } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { mockRemoteSurveyResult } from '../mocks/survey'

describe('RemoteLoadSurveyResult', () => {
  const httpClientSpy = mock<HttpClient>()
  const remoteSurveyResultMock = mockRemoteSurveyResult()
  const url = faker.internet.url()
  const makeSut = (): RemoteLoadSurveyResult => new RemoteLoadSurveyResult(url, httpClientSpy)

  beforeAll(() => {
    httpClientSpy.request.mockResolvedValue({ statusCode: 200, body: remoteSurveyResultMock })
  })

  it('should call HttpClient with correct URL and method', async () => {
    const sut = makeSut()
    await sut.load()
    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, method: 'get' })
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const sut = makeSut()
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const sut = makeSut()
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const sut = makeSut()
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a surveyResult on 200', async () => {
    const surveyResultMock = { ...remoteSurveyResultMock, date: new Date(remoteSurveyResultMock.date) }
    const sut = makeSut()
    const surveyResult = await sut.load()
    expect(surveyResult).toEqual(surveyResultMock)
  })
})
