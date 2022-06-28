import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import { Calendar, Error, Footer, Header, Loading } from '@presentation/components'
import { LoadSurveyResult } from '@domain/usecases'
import { useErrorHandler } from '@presentation/hooks'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={Styles.calendarWrap} />
              <h2 role="question">{state.surveyResult.question}</h2>
            </hgroup>
            <ul role="answers">
              {state.surveyResult.answers.map(answer => (
                <li role="answer-wrap" key={answer.answer} className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
                  {answer.image && <img role="answer-image" src={answer.image} alt={answer.answer} />}
                  <span role="answer" className={Styles.answer}>{answer.answer}</span>
                  <span role="answer-percent" className={Styles.percent}>{answer.percent}%</span>
                </li>
              ))}
            </ul>
            <button role="back-button" onClick={() => navigate(-1)}>Voltar</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={handleReload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
