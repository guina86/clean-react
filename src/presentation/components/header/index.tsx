import React, { memo, MouseEvent, useContext } from 'react'
import { Logo } from '@presentation/components'
import Styles from './styles.scss'
import { ApiContext } from '@presentation/contexts'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const logout = (event: MouseEvent): void => {
    event.preventDefault()
    setCurrentAccount!(undefined)
    navigate('/login', { replace: true })
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span role="username">{getCurrentAccount!()?.name}</span>
          <a role="logout" href="#" onClick={logout}>sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
