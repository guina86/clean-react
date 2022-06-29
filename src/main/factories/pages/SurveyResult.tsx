import { SurveyResult } from '@presentation/pages'
import React from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '@main/factories/usecases'

export const SurveyResultFactory: React.FC = () => {
  const { id } = useParams()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id!)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id!)}
    />
  )
}
