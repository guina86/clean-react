import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@presentation/components'
import Context from '@presentation/contexts/form-context'
import { Link } from 'react-router-dom'
import { Validation } from '@presentation/validation/protocols'
import { AddAccount } from '@domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
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
  useEffect(() => {
    setState(old => ({
      ...old,
      nameError: validation.validate('name', old.name),
      emailError: validation.validate('email', old.email),
      passwordError: validation.validate('password', old.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', old.passwordConfirmation)
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) return
      setState(old => ({
        ...old,
        isLoading: true
      }))
      await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
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
          <button disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} className={Styles.submit} type="submit">Entrar</button>
          <Link to="/login" role="register-link" className={Styles.link}>voltar para login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
