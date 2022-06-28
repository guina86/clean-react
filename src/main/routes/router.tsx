import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApiContext } from '@presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@main/adapters/current-account-adapter'
import { PrivateRoute } from '@presentation/components'
import { SurveyResultFactory } from '@main/factories/pages/SurveyResult'
import { LoginFactory } from '@main/factories/pages/Login'
import { SignUpFactory } from '@main/factories/pages/Signup'
import { SurveyListFactory } from '@main/factories/pages'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFactory />} />
          <Route path="/signup" element={<SignUpFactory />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<SurveyListFactory />} />
            <Route path="/surveys/:id" element={<SurveyResultFactory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider >
  )
}

export default Router
