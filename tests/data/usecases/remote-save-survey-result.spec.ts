import { HttpClient, HttpStatusCode } from '@data/protocols'
import { RemoteSaveSurveyResult } from '@data/usecases'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
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

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const sut = makeSut()
    const promise = sut.save({ answer: 'any_answer' })
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const sut = makeSut()
    const promise = sut.save({ answer: 'any_answer' })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const sut = makeSut()
    const promise = sut.save({ answer: 'any_answer' })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a surveyResult on 200', async () => {
    const surveyResultMock = { ...remoteSurveyResultMock, date: new Date(remoteSurveyResultMock.date) }
    const sut = makeSut()
    const surveyResult = await sut.save({ answer: 'any_answer' })
    expect(surveyResult).toEqual(surveyResultMock)
  })
})
