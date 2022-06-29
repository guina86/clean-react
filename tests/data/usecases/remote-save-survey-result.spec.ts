import { RemoteSaveSurveyResult } from '@data/usecases'
import { HttpClient, HttpStatusCode } from '@data/protocols'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { mockRemoteSurveyResult } from '@tests/data/mocks'
import { mock } from 'jest-mock-extended'
import { faker } from '@faker-js/faker'

describe('RemoteSaveSurveyResult', () => {
  const makeSut = (): RemoteSaveSurveyResult => new RemoteSaveSurveyResult(url, httpClientSpy)
  const httpClientSpy = mock<HttpClient>()
  const url = faker.internet.url()
  const remoteSurveyResultMock = mockRemoteSurveyResult()

  beforeAll(() => {
    httpClientSpy.request.mockResolvedValue({ statusCode: 200, body: remoteSurveyResultMock })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call HttpClient with correct URL, body and method', async () => {
    const sut = makeSut()

    await sut.save({ answer: 'any_answer' })

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, body: { answer: 'any_answer' }, method: 'put' })
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })

    const promise = sut.save({ answer: 'any_answer' })

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.save({ answer: 'any_answer' })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.save({ answer: 'any_answer' })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a surveyResult on 200', async () => {
    const sut = makeSut()
    const surveyResultMock = { ...remoteSurveyResultMock, date: new Date(remoteSurveyResultMock.date) }

    const surveyResult = await sut.save({ answer: 'any_answer' })

    expect(surveyResult).toEqual(surveyResultMock)
  })
})
