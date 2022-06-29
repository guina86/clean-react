import Styles from './styles.scss'
import { LoadSurveyList } from '@domain/usecases'
import { Error, Footer, Header } from '@presentation/components'
import { SurveyListItems } from '@presentation/pages/load-survey-list/components'
import { useErrorHandler } from '@presentation/hooks'
import React, { useEffect, useState } from 'react'

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
      .catch(handleError)
  }, [state.reload])

  const handleError = useErrorHandler(error => {
    setState(old => ({ ...old, error: error.message }))
  })

  const handleReload = (): void => {
    setState(old => ({ surveys: [], error: '', reload: !old.reload }))
  }

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error ? <Error error={state.error} reload={handleReload} /> : <SurveyListItems surveys={state.surveys} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
