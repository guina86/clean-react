import React, { memo, MouseEvent, useContext } from 'react'
import { Logo } from '@presentation/components'
import Styles from './styles.scss'
import { ApiContext } from '@presentation/contexts'
import { useLogout } from '@presentation/hooks'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)
  const logoutHandler = (event: MouseEvent): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span role="username">{getCurrentAccount!()?.name}</span>
          <a role="logout" href="#" onClick={logoutHandler}>sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
