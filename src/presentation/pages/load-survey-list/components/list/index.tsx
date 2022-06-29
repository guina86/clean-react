import Styles from './styles.scss'
import { LoadSurveyList } from '@domain/usecases'
import { SurveyItem, SurveyItemEmpty } from '@presentation/pages/load-survey-list/components'
import React from 'react'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const SurveyListItems: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} role="survey-list">
      {surveys.length
        ? surveys.map(survey => <SurveyItem survey={survey} key={survey.id} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default SurveyListItems
