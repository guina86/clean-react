import { RemoteLoadSurveyList } from '@data/usecases'
import { makeApiUrl } from '@main/factories/http'
import { makeAuthHttpClientDecorator } from '@main/factories/decorators'

export const makeRemoteLoadSurveyList = (): RemoteLoadSurveyList =>
  new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthHttpClientDecorator())
