import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@presentation/components'
import Context from '@presentation/contexts/form-context'
import { Validation } from '@presentation/validation/protocols'
import { Authentication, SaveAccessToken } from '@domain/usecases'
import { Link, useNavigate } from 'react-router-dom'
import SubmitButton from '@presentation/components/submit-button'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    errorMessage: ''
  })
  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)
    const isFormInvalid = !!emailError || !!passwordError

    setState(old => ({ ...old, emailError, passwordError, isFormInvalid }))
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) return
      setState(old => ({
        ...old,
        isLoading: true
      }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      navigate('/', { replace: true })
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        errorMessage: (error as Error).message
      }))
    }
  }

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState } }>
        <form className={Styles.form} onSubmit={handleSubmit} aria-label="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <SubmitButton>Entrar</SubmitButton>
          <Link replace to="/signup" role="register-link" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
