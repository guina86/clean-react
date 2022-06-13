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

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }
  const getTitle = (): string => {
    return error || 'Tudo certo!'
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} autoComplete='nope' onChange={handleChange}/>
      <span role={`${props.name!}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
