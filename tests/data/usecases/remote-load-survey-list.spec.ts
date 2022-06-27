import { HttpGetClient, HttpStatusCode } from '@data/protocols'
import { RemoteLoadSurveyList } from '@data/usecases'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { mockRemoteSurveyList } from '@tests/data/mocks/survey'

describe('RemoteLoadSurveyList', () => {
  let sut: RemoteLoadSurveyList
  let url: string
  let mockedSurveyList: RemoteLoadSurveyList.Model[]
  const httpGetClientSpy = mock<HttpGetClient<RemoteLoadSurveyList.Model[]>>()

  beforeAll(() => {
    url = faker.internet.url()
    mockedSurveyList = mockRemoteSurveyList()
    httpGetClientSpy.get.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: mockedSurveyList
    })
  })

  beforeEach(() => {
    sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  })

  it('should call HttpGetClient with correct URL', async () => {
    await sut.loadAll()

    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url })
  })

  it('should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of surveys if HttpGetClient returns 200', async () => {
    const expectedList = mockedSurveyList.map(survey => ({ ...survey, date: new Date(survey.date) }))
    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual(expectedList)
  })

  it('should return a empty list if HttpGetClient returns 204', async () => {
    httpGetClientSpy.get.mockResolvedValue({ statusCode: HttpStatusCode.noContent })
    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual([])
  })
})
