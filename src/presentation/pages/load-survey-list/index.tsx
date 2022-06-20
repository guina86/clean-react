import { LoadSurveyList } from '@domain/usecases'
import { Footer, Header } from '@presentation/components'
import React, { useEffect } from 'react'
import { SurveyItemEmpty } from './components'
import Styles from './styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    void loadSurveyList.loadAll().then().catch()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul role="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
