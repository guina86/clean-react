import React, { useContext } from 'react'
import Styles from './styles.scss'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '..'
import { LoadSurveyList } from '@domain/usecases'

const SurveyListItems: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} role="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => (<SurveyItem survey={survey} key={survey.id} />))
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default SurveyListItems
