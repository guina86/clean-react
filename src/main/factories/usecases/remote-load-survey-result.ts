import { RemoteLoadSurveyResult } from '@data/usecases'
import { makeApiUrl } from '@main/factories/http'
import { makeAuthHttpClientDecorator } from '@main/factories/decorators'

export const makeRemoteLoadSurveyResult = (id: string): RemoteLoadSurveyResult =>
  new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthHttpClientDecorator())
