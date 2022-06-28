import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import { SurveyResultData } from './components'
import { Error, Footer, Header, Loading } from '@presentation/components'
import { LoadSurveyResult } from '@domain/usecases'
import { useErrorHandler } from '@presentation/hooks'

const initialState = {
  isLoading: false,
  error: '',
  surveyResult: undefined as LoadSurveyResult.Model | undefined,
  reload: false
}

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    void loadSurveyResult.load().then(survey => {
      setState(old => ({ ...old, surveyResult: survey }))
    }).catch(handleError)
  }, [state.reload])

  const handleError = useErrorHandler(error => {
    setState(old => ({ ...old, surveyResult: undefined, error: error.message }))
  })

  const handleReload = (): void => {
    setState(old => ({ surveyResult: undefined, error: '', reload: !old.reload, isLoading: false }))
  }

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div role="survey-container" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={handleReload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
