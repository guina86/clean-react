import Styles from './styles.scss'
import { Logo } from '@presentation/components'
import React, { memo } from 'react'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
    </header>
  )
}

export default memo(LoginHeader)
