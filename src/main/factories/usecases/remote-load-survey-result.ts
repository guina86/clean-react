import { RemoteLoadSurveyResult } from '@data/usecases'
import { makeAuthHttpClientDecorator } from '@main/factories/decorators'
import { makeApiUrl } from '@main/factories/http'

export const makeRemoteLoadSurveyResult = (id: string): RemoteLoadSurveyResult =>
  new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthHttpClientDecorator())
