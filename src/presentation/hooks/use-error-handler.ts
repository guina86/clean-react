import { AccessDeniedError } from '@domain/errors'
import { ApiContext } from '@presentation/contexts'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

type CallbackType = (error: Error) => void

export const useErrorHandler = (callback: CallbackType): CallbackType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount!(undefined)
      navigate('/login', { replace: true })
    } else {
      callback(error)
    }
  }
}
