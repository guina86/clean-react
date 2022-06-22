import { SurveyModel } from '@domain/model'
import { LoadSurveyList } from '@domain/usecases'
import { Footer, Header } from '@presentation/components'
import React, { useEffect, useState } from 'react'
import { SurveyItem, SurveyItemEmpty } from './components'
import Styles from './styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState<{ surveys: SurveyModel[] }>({
    surveys: []
  })

  useEffect(() => {
    void loadSurveyList.loadAll()
      .then(surveys => setState({ surveys }))
      .catch()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul role="survey-list">
          {state.surveys.length
            ? state.surveys.map(survey => (<SurveyItem survey={survey} key={survey.id} />))
            : <SurveyItemEmpty />
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
