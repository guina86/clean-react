import React, { memo } from 'react'
import { Logo } from '@presentation/components'
import Styles from './styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
    <div className={Styles.headerContent}>
      <Logo />
      <div className={Styles.logoutWrap}>
        <span>Leandro</span>
        <a href="#">sair</a>
      </div>
    </div>
  </header>
  )
}

export default memo(Header)
