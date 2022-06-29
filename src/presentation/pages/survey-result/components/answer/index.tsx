import { SurveyResultAnswerModel } from '@domain/model'
import React, { MouseEvent, useContext } from 'react'
import { SurveyResultContext } from '..'
import Styles from './styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext)
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
  const answerClick = (event: MouseEvent): void => {
    if (!event.currentTarget.classList.contains(Styles.active)) onAnswer!(answer.answer)
  }

  return (
    <li
      role="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
    >
      {answer.image && <img role="answer-image" src={answer.image} alt={answer.answer} />}
      <span role="answer" className={Styles.answer}>{answer.answer}</span>
      <span role="answer-percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
