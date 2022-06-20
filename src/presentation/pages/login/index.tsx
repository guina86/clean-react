import React, { useContext, useEffect, useState } from 'react'
import Styles from './styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@presentation/components'
import { FormContext, ApiContext } from '@presentation/contexts'
import { Validation } from '@presentation/validation/protocols'
import { Authentication } from '@domain/usecases'
import { Link, useNavigate } from 'react-router-dom'
import SubmitButton from '@presentation/components/submit-button'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
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
    const formData = { email: state.email, password: state.password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
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
      setCurrentAccount!(account)
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
    <div className={Styles.loginWrap}>
      <Header />
      <FormContext.Provider value={{ state, setState } }>
        <form className={Styles.form} onSubmit={handleSubmit} aria-label="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <SubmitButton>Entrar</SubmitButton>
          <Link replace to="/signup" role="register-link" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
