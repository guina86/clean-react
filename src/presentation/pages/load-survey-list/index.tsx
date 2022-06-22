import { SurveyModel } from '@domain/model'
import { LoadSurveyList } from '@domain/usecases'
import { Footer, Header } from '@presentation/components'
import React, { useEffect, useState } from 'react'
import { SurveyItem, SurveyItemEmpty } from './components'
import Styles from './styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

type StateProps = {
  surveys: SurveyModel[]
  error: string
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState<StateProps>({
    surveys: [],
    error: ''
  })

  useEffect(() => {
    void loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(error => setState(old => ({ ...old, error: error.message })))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? <div>
            <span role="error-message">{state.error}</span>
            <button>Recarregar</button>
          </div>
          : <ul role="survey-list">
            {state.surveys.length
              ? state.surveys.map(survey => (<SurveyItem survey={survey} key={survey.id} />))
              : <SurveyItemEmpty />
            }
          </ul>
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
