import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, SignUp } from '@presentation/pages'
import { makeRemoteAuthentication } from '@main/factories/usecases/remote-authentication'
import { makeLoginValidation } from '@main/factories/validation/login-validation'
import { makeLocalSaveAccessToken } from '@main/factories/usecases'
import { makeSignUpValidation } from '@main/factories/validation'
import { makeRemoteAddAccount } from '@main/factories/usecases/remote-add-account'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login
          authentication={makeRemoteAuthentication()}
          validation={makeLoginValidation()}
          saveAccessToken={makeLocalSaveAccessToken()}
          />
        }/>
        <Route path="/signup" element={<SignUp
          addAccount={makeRemoteAddAccount()}
          validation={makeSignUpValidation()}
          saveAccessToken={makeLocalSaveAccessToken()}
        />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
