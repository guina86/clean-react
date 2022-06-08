import React, { useContext } from 'react'
import Styles from './styles.scss'
import { Spinner } from '@presentation/components'
import Context from '@presentation/contexts/form-context'

const FormStatus: React.FC = () => {
  const { state: { isLoading }, errorState: { message } } = useContext(Context)

  return (
    <div data-testid="statusWrap" className={Styles.statusWrap}>
      { isLoading && <Spinner className={Styles.spinner}/>}
      { message && <span className={Styles.error}>{message}</span>}
    </div>
  )
}

export default FormStatus
