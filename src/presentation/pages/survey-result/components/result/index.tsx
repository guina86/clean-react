import Styles from './styles.scss'
import { LoadSurveyResult } from '@domain/usecases'
import { Calendar } from '@presentation/components'
import { SurveyResultAnswer } from '@presentation/pages/survey-result/components'
import { useNavigate } from 'react-router-dom'
import React from 'react'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 role="question">{surveyResult.question}</h2>
      </hgroup>
      <ul role="answers" className={Styles.answerList}>
        {surveyResult.answers.map(answer => (<SurveyResultAnswer key={answer.answer} answer={answer} />))}
      </ul>
      <button role="back-button" onClick={() => navigate(-1)} className={Styles.button}>Voltar</button>
    </>
  )
}

export default Result
