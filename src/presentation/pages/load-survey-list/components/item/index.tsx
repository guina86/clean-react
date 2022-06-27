import { LoadSurveyList } from '@domain/usecases'
import { Icon, IconName } from '@presentation/components'
import Calendar from '@presentation/components/calendar'
import React from 'react'
import Styles from './styles.scss'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li role="survey-item" className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown} className={Styles.iconWrap} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p role="question-text">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
