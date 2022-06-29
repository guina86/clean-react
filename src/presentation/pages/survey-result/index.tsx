import Styles from './styles.scss'
import { LoadSurveyResult, SaveSurveyResult } from '@domain/usecases'
import { Error, Footer, Header, Loading } from '@presentation/components'
import { SurveyResultContext, SurveyResultData } from '@presentation/pages/survey-result/components'
import { useErrorHandler } from '@presentation/hooks'
import React, { useEffect, useState } from 'react'

const initialState = {
  isLoading: false,
  error: '',
  surveyResult: undefined as LoadSurveyResult.Model | undefined,
  reload: false
}

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    void loadSurveyResult.load().then(survey => {
      setState(old => ({ ...old, surveyResult: survey }))
    }).catch(handleError)
  }, [state.reload])

  const handleError = useErrorHandler(error => {
    setState(old => ({ ...old, surveyResult: undefined, error: error.message, isLoading: false }))
  })

  const handleReload = (): void => {
    setState(old => ({ surveyResult: undefined, error: '', reload: !old.reload, isLoading: false }))
  }

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return
    setState(old => ({ ...old, isLoading: true }))
    void saveSurveyResult.save({ answer })
      .then(survey => {
        setState(old => ({ ...old, surveyResult: survey, isLoading: false }))
      }).catch(handleError)
  }

  return (
    <SurveyResultContext.Provider value={{ onAnswer }}>
      <div className={Styles.surveyResultWrap}>
        <Header />
        <div role="survey-container" className={Styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={handleReload} />}
        </div>
        <Footer />
      </div>
    </SurveyResultContext.Provider>
  )
}

export default SurveyResult
