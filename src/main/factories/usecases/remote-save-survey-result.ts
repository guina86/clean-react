import { RemoteSaveSurveyResult } from '@data/usecases'
import { makeApiUrl } from '@main/factories/http'
import { makeAuthHttpClientDecorator } from '@main/factories/decorators'
import { SaveSurveyResult } from '@domain/usecases'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult =>
  new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthHttpClientDecorator())
