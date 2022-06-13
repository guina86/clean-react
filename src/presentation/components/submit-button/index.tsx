import Context from '@presentation/contexts/form-context'
import React, { useContext } from 'react'

type Props = {
  children: string
}

const SubmitButton: React.FC<Props> = ({ children }: Props) => {
  const { state } = useContext(Context)

  return (
    <button disabled={state.isFormInvalid} type="submit">{children}</button>
  )
}

export default SubmitButton
