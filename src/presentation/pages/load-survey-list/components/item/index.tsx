import { SurveyModel } from '@domain/model'
import { Icon, IconName } from '@presentation/components'
import React from 'react'
import Styles from './styles.scss'

type Props = {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li role="survey-item" className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown} className={Styles.iconWrap} />
        <time>
          <span role="date-day" className={Styles.day}>{survey.date.getDate().toString().padStart(2, '0')}</span>
          <span role="date-month" className={Styles.month}>{survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}</span>
          <span role="date-year" className={Styles.year}>{survey.date.getFullYear()}</span>
        </time>
        <p role="question-text">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
