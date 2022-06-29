import Styles from './styles.scss'
import React from 'react'

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li role="empty-item" className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
    </>
  )
}

export default SurveyItemEmpty
