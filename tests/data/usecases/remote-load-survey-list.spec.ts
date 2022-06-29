import { RemoteLoadSurveyList } from '@data/usecases'
import { HttpClient, HttpStatusCode } from '@data/protocols'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { mockRemoteSurveyList } from '@tests/data/mocks'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteLoadSurveyList', () => {
  const makeSut = (): RemoteLoadSurveyList => new RemoteLoadSurveyList(url, httpClientSpy)
  const httpClientSpy = mock<HttpClient<RemoteLoadSurveyList.Model[]>>()
  const url = faker.internet.url()
  const mockedSurveyList = mockRemoteSurveyList()

  beforeAll(() => {
    httpClientSpy.request.mockResolvedValue({ statusCode: HttpStatusCode.ok, body: mockedSurveyList })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call HttpClient with correct URL and method', async () => {
    const sut = makeSut()

    await sut.loadAll()

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, method: 'get' })
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of surveys if HttpClient returns 200', async () => {
    const sut = makeSut()
    const expectedList = mockedSurveyList.map(survey => ({ ...survey, date: new Date(survey.date) }))

    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual(expectedList)
  })

  it('should return a empty list if HttpClient returns 204', async () => {
    const sut = makeSut()
    httpClientSpy.request.mockResolvedValue({ statusCode: HttpStatusCode.noContent })

    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual([])
  })
})
