import React, { useContext } from 'react'
import Styles from './styles.scss'
import Context from '@presentation/contexts/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name!}Error`]
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState((old: any) => ({
      ...old,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        role={`${props.name!}-input`}
        placeholder=' '
        autoComplete='new-password'
        onChange={handleChange}
      />
      <label>{props.placeholder}</label>
      <span
        role={`${props.name!}-status`}
        title={error || 'Tudo certo!'}
        className={Styles.status}>
          {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
