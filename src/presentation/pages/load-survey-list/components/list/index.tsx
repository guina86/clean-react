import { SurveyModel } from '@domain/model'
import React, { useContext } from 'react'
import Styles from './styles.scss'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '..'

const SurveyListItems: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} role="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: SurveyModel) => (<SurveyItem survey={survey} key={survey.id} />))
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default SurveyListItems
