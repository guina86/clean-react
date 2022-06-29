import Styles from './styles.scss'
import { AddAccount } from '@domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus, SubmitButton } from '@presentation/components'
import { ApiContext, FormContext } from '@presentation/contexts'
import { Validation } from '@presentation/validation/protocols'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const initialState = {
  isLoading: false,
  isFormInvalid: true,
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  nameError: '',
  emailError: '',
  passwordError: '',
  passwordConfirmationError: '',
  errorMessage: ''
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState(old => ({
        ...old,
        isLoading: true
      }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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
    <div className={Styles.signupWrap}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit} aria-label="form">
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder='Digite seu nome' />
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <Input type="password" name="passwordConfirmation" placeholder='Repita sua senha' />
          <SubmitButton>Cadastrar</SubmitButton>
          <Link replace to="/login" role="login-link" className={Styles.link}>voltar para login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
