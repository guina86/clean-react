import { RemoteSaveSurveyResult } from '@data/usecases'
import { makeApiUrl } from '@main/factories/http'
import { makeAuthHttpClientDecorator } from '@main/factories/decorators'

export const makeRemoteSaveSurveyResult = (id: string): RemoteSaveSurveyResult =>
  new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthHttpClientDecorator())
