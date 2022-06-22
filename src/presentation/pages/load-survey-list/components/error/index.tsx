import React, { useContext } from 'react'
import { SurveyContext } from '..'
import Styles from './styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={Styles.errorWrap}>
      <span role="error-message">{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
