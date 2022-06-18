import { HttpGetClient } from '@data/protocols'
import { RemoteLoadSurveyList } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('RemoteLoadSurveyList', () => {
  let sut: RemoteLoadSurveyList
  let url: string
  const httpGetClientSpy = mock<HttpGetClient>()

  beforeAll(() => {
    url = faker.internet.url()
  })

  beforeEach(() => {
    sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  })

  it('should call HttpGetClient with correct URL', async () => {
    await sut.loadAll()

    expect(httpGetClientSpy.get).toHaveBeenCalledWith({ url })
  })
})
