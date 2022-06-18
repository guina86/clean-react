import { HttpGetClient, HttpStatusCode } from '@data/protocols'
import { RemoteLoadSurveyList } from '@data/usecases'
import { UnexpectedError } from '@domain/errors'
import { SurveyModel } from '@domain/model'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteLoadSurveyList', () => {
  let sut: RemoteLoadSurveyList
  let url: string
  const httpGetClientSpy = mock<HttpGetClient<SurveyModel[]>>()

  beforeAll(() => {
    url = faker.internet.url()
    httpGetClientSpy.get.mockResolvedValue({ statusCode: HttpStatusCode.ok })
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
})
