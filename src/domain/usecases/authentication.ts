import { AccountModel } from '@domain/model/account-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Autentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
