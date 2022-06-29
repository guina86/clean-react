import Styles from './styles.scss'
import { Spinner } from '@presentation/components'
import { FormContext } from '@presentation/contexts'
import React, { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { state: { isLoading, errorMessage } } = useContext(FormContext)
  return (
    <div role="status-wrap" className={Styles.statusWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span role="error-message" className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
