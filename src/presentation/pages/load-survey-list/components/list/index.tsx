import React from 'react'
import Styles from './styles.scss'
import { SurveyItem, SurveyItemEmpty } from '..'
import { LoadSurveyList } from '@domain/usecases'

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
