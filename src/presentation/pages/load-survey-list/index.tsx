import { LoadSurveyList } from '@domain/usecases'
import { Footer, Header } from '@presentation/components'
import React, { useEffect, useState } from 'react'
import { SurveyListItems, SurveyContext, SurveyError } from './components'
import Styles from './styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

export type StateProps = {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState<StateProps>({
    surveys: [],
    error: '',
    reload: false
  })

  useEffect(() => {
    void loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(error => setState(old => ({ ...old, error: error.message })))
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyError /> : <SurveyListItems />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
