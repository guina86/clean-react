import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, SignUp, SurveyList } from '@presentation/pages'
import { makeRemoteAuthentication, makeRemoteAddAccount } from '@main/factories/usecases'
import { makeLoginValidation, makeSignUpValidation } from '@main/factories/validation'
import { ApiContext } from '@presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@main/adapters/current-account-adapter'
import { PrivateRoute } from '@presentation/components'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
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
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<SurveyList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
