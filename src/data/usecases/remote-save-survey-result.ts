import { RemoteSurveyResultModel } from '@data/models'
import { HttpClient } from '@data/protocols'
import { SaveSurveyResult } from '@domain/usecases'

export class RemoteSaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
