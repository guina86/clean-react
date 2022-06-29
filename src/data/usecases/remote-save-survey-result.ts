import { RemoteSurveyResultModel } from '@data/models'
import { HttpClient, HttpStatusCode } from '@data/protocols'
import { AccessDeniedError } from '@domain/errors'
import { SaveSurveyResult } from '@domain/usecases'

export class RemoteSaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: break
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
