import Styles from './styles.scss'
import React from 'react'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span role="error-message">{error}</span>
      <button onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
