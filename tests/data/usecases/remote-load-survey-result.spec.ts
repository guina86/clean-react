import { HttpGetClient, HttpStatusCode } from '@data/protocols'
import { RemoteLoadSurveyResult } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { mockRemoteSurveyResult } from '../mocks/survey'

describe('RemoteLoadSurveyResult', () => {
  const httpGetClientSpy = mock<HttpGetClient>()
  const remoteSurveyResultMock = mockRemoteSurveyResult()
  const url = faker.internet.url()
  const makeSut = (): RemoteLoadSurveyResult => new RemoteLoadSurveyResult(url, httpGetClientSpy)

  beforeAll(() => {
    httpGetClientSpy.get.mockResolvedValue({ statusCode: 200, body: remoteSurveyResultMock })
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

  it('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const sut = makeSut()
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
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
