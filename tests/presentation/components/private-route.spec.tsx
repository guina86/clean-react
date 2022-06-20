import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'
import PrivateRoute from '@presentation/components/private-route'
import { createMemoryHistory } from 'history'
import { SurveyList } from '@presentation/pages'
import { ApiContext } from '@presentation/contexts'

describe('PrivateRoute', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  it('should redirect to /login if token is empty', () => {
    render(
      <ApiContext.Provider value={{ getCurrentAccount: () => null }} >
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<SurveyList />} />
            </Route>
          </Routes>
        </Router>
      </ApiContext.Provider>
    )
    expect(history.location.pathname).toBe('/login')
  })
})

describe('PrivateRoute', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  it('should render current component if token is not empty', () => {
    render(
      <ApiContext.Provider value={{ getCurrentAccount: () => ({ accessToken: 'any_token', name: 'any_name' }) }} >
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<SurveyList />} />
            </Route>
          </Routes>
        </Router>
      </ApiContext.Provider>
    )
    expect(history.location.pathname).toBe('/')
  })
})
