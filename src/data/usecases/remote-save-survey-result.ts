import { RemoteSurveyResultModel } from '@data/models'
import { HttpClient, HttpStatusCode } from '@data/protocols'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { SaveSurveyResult } from '@domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return { ...httpResponse.body, date: new Date(httpResponse.body?.date) }
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
