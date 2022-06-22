import React from 'react'
import Styles from './styles.scss'

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
