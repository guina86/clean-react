import { SurveyList } from '@presentation/pages'
import { makeRemoteLoadSurveyList } from '@main/factories/usecases'
import React from 'react'

export const SurveyListFactory: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeRemoteLoadSurveyList()}
    />
  )
}
