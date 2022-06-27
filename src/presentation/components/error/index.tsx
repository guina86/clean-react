import React from 'react'

import Styles from './styles.scss'

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
