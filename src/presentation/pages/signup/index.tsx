import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@presentation/components'
import Context from '@presentation/contexts/form-context'
import { Link, useNavigate } from 'react-router-dom'
import { Validation } from '@presentation/validation/protocols'
import { AddAccount, SaveAccessToken } from '@domain/usecases'
import SubmitButton from '@presentation/components/submit-button'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
  useEffect(() => {
    const nameError = validation.validate('name', state.name)
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)
    const passwordConfirmationError = validation.validate('passwordConfirmation', state.passwordConfirmation)
    const isFormInvalid = !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError

    setState(old => ({ ...old, nameError, emailError, passwordError, passwordConfirmationError, isFormInvalid }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

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
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state, setState } }>
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
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
