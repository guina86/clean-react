import Styles from './styles.scss'
import { Authentication } from '@domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus, SubmitButton } from '@presentation/components'
import { FormContext, ApiContext } from '@presentation/contexts'
import { Validation } from '@presentation/validation/protocols'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  authentication: Authentication
}

const initialState = {
  isLoading: false,
  isFormInvalid: true,
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  errorMessage: ''
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.passwordError || !!old.emailError }))
  }

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
      <FormContext.Provider value={{ state, setState }}>
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
