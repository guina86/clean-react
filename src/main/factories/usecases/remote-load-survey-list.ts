import { RemoteLoadSurveyList } from '@data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@main/factories/http'

export const makeRemoteLoadSurveyList = (): RemoteLoadSurveyList =>
  new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
