import { SignUp } from '@presentation/pages'
import { makeRemoteAddAccount } from '@main/factories/usecases'
import { makeSignUpValidation } from '@main/factories/validation'
import React from 'react'

export const SignUpFactory: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
