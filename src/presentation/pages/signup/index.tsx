import React, { useState } from 'react'
import Styles from './styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@presentation/components'
import Context from '@presentation/contexts/form-context'
import { Link } from 'react-router-dom'

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    errorMessage: ''
  })

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state } }>
        <form className={Styles.form} aria-label="form">
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder='Digite seu nome' />
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <Input type="password" name="passwordConfirmation" placeholder='Repita sua senha' />
          <button disabled className={Styles.submit} type="submit">Entrar</button>
          <Link to="/login" role="register-link" className={Styles.link}>voltar para login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
