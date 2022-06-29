import { RemoteLoadSurveyResult } from '@data/usecases'
import { makeApiUrl } from '@main/factories/http'
import { makeAuthHttpClientDecorator } from '@main/factories/decorators'
import { LoadSurveyResult } from '@domain/usecases'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult =>
  new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthHttpClientDecorator())
