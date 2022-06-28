import { HttpClient, HttpStatusCode } from '@data/protocols'
import { RemoteLoadSurveyList } from '@data/usecases'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { mockRemoteSurveyList } from '@tests/data/mocks/survey'

describe('RemoteLoadSurveyList', () => {
  let sut: RemoteLoadSurveyList
  let url: string
  let mockedSurveyList: RemoteLoadSurveyList.Model[]
  const httpClientSpy = mock<HttpClient<RemoteLoadSurveyList.Model[]>>()

  beforeAll(() => {
    url = faker.internet.url()
    mockedSurveyList = mockRemoteSurveyList()
    httpClientSpy.request.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: mockedSurveyList
    })
  })

  beforeEach(() => {
    sut = new RemoteLoadSurveyList(url, httpClientSpy)
  })

  it('should call HttpClient with correct URL and method', async () => {
    await sut.loadAll()

    expect(httpClientSpy.request).toHaveBeenCalledWith({ url, method: 'get' })
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClientSpy.request.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of surveys if HttpClient returns 200', async () => {
    const expectedList = mockedSurveyList.map(survey => ({ ...survey, date: new Date(survey.date) }))
    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual(expectedList)
  })

  it('should return a empty list if HttpClient returns 204', async () => {
    httpClientSpy.request.mockResolvedValue({ statusCode: HttpStatusCode.noContent })
    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual([])
  })
})
