import { createContext } from 'react'

type Props = {
  isLoading?: boolean
  errorMessage?: string
}

export default createContext<Props>({})
