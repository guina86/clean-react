import React, { memo } from 'react'
import Logo from '@presentation/components/logo'
import Styles from './styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
        <Logo />
        <h1>Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
