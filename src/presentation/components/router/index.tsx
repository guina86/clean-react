import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, SignUp, SurveyList } from '@presentation/pages'
import { makeRemoteAuthentication, makeLocalSaveAccessToken, makeRemoteAddAccount } from '@main/factories/usecases'
import { makeLoginValidation, makeSignUpValidation } from '@main/factories/validation'

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
          />
        }/>
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
