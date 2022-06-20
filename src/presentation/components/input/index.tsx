import React, { useContext } from 'react'
import Styles from './styles.scss'
import { FormContext } from '@presentation/contexts'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name!}Error`]
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState((old: any) => ({
      ...old,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className={Styles.inputWrap} role={`${props.name!}-wrap`} data-status={error ? 'invalid' : 'valid'}>
      <input
        {...props}
        title={error}
        role={`${props.name!}-input`}
        placeholder=' '
        autoComplete='new-password'
        onChange={handleChange}
      />
      <label title={error} role={`${props.name!}-label`}>{props.placeholder}</label>
    </div>
  )
}

export default Input
