import { AccountModel } from '@domain/model'

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Result = AccountModel
}
