import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, SignUp, SurveyList } from '@presentation/pages'
import { makeRemoteAuthentication, makeRemoteAddAccount } from '@main/factories/usecases'
import { makeLoginValidation, makeSignUpValidation } from '@main/factories/validation'
import { ApiContext } from '@presentation/contexts'
import { setCurrentAccountAdapter } from '@main/adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login
            authentication={makeRemoteAuthentication()}
            validation={makeLoginValidation()}
            />
          }/>
          <Route path="/signup" element={<SignUp
            addAccount={makeRemoteAddAccount()}
            validation={makeSignUpValidation()}
            />
          }/>
          <Route path="/" element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
