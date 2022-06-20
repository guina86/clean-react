import { FormContext } from '@presentation/contexts'
import React, { useContext } from 'react'

type Props = {
  children: string
}

const SubmitButton: React.FC<Props> = ({ children }: Props) => {
  const { state } = useContext(FormContext)

  return (
    <button disabled={state.isFormInvalid} type="submit">{children}</button>
  )
}

export default SubmitButton
