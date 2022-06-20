import { AccountModel } from '@domain/model'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel | null
}

export default createContext<Props>({})
