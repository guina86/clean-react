import { HttpGetClient, HttpStatusCode } from '@data/protocols'
import { RemoteLoadSurveyList } from '@data/usecases'
import { UnexpectedError } from '@domain/errors'
import { LoadSurveyList } from '@domain/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'
import { mockSurveyList } from '../mocks/survey'

describe('RemoteLoadSurveyList', () => {
  let sut: RemoteLoadSurveyList
  let url: string
  let mockedSurveyList: LoadSurveyList.Model[]
  const httpGetClientSpy = mock<HttpGetClient<LoadSurveyList.Model[]>>()

  beforeAll(() => {
    url = faker.internet.url()
    mockedSurveyList = mockSurveyList()
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

  it('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    httpGetClientSpy.get.mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of surveys if HttpGetClient returns 200', async () => {
    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual(mockedSurveyList)
  })

  it('should return a empty list if HttpGetClient returns 204', async () => {
    httpGetClientSpy.get.mockResolvedValue({ statusCode: HttpStatusCode.noContent })
    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual([])
  })
})
