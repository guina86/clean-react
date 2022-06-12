import { Login } from '@presentation/pages'
import React from 'react'
import { makeRemoteAuthentication, makeSaveAccessToken } from '@main/factories/usecases'
import { makeLoginValidation } from '@main/factories/validation'

export const makeLogin: React.FC = () => {
  return (<Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} saveAccessToken={makeSaveAccessToken()}/>)
}
