import { LoadSurveyResult } from '@domain/usecases'
import React from 'react'
import Styles from './styles.scss'

type Props = {
  answer: LoadSurveyResult.Answer
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  return (
    <li role="answer-wrap" className={[Styles.answerWrap, activeClassName].join(' ')}>
      {answer.image && <img role="answer-image" src={answer.image} alt={answer.answer} />}
      <span role="answer" className={Styles.answer}>{answer.answer}</span>
      <span role="answer-percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
