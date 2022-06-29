import Styles from './styles.scss'
import Spinner from '@presentation/components/spinner'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div role="loading" className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default Loading
