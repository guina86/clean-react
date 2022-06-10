import React, { useContext } from 'react'
import Styles from './styles.scss'
import { Spinner } from '@presentation/components'
import Context from '@presentation/contexts/form-context'

const FormStatus: React.FC = () => {
  const { state: { isLoading, errorMessage } } = useContext(Context)
  return (
    <div role="status-wrap" className={Styles.statusWrap}>
      { isLoading && <Spinner className={Styles.spinner}/>}
      { errorMessage && <span role="error-message" className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
