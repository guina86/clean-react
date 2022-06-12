import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@presentation/pages'
import { makeRemoteAuthentication } from '@main/factories/usecases/remote-authentication'
import { makeLoginValidation } from '@main/factories/validation/login-validation'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
