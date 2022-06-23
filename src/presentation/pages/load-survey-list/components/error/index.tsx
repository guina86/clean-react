import React, { useContext } from 'react'
import { SurveyContext } from '..'
import { StateProps } from '../..'
import Styles from './styles.scss'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState((old: StateProps) => ({ surveys: [], error: '', reload: !old.reload }))
  }

  return (
    <div className={Styles.errorWrap}>
      <span role="error-message">{state.error}</span>
      <button onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
