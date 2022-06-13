import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, SignUp } from '@presentation/pages'
import { makeRemoteAuthentication } from '@main/factories/usecases/remote-authentication'
import { makeLoginValidation } from '@main/factories/validation/login-validation'
import { makeSaveAccessToken } from '@main/factories/usecases'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login
          authentication={makeRemoteAuthentication()}
          validation={makeLoginValidation()}
          saveAccessToken={makeSaveAccessToken()}
          />
        }/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
