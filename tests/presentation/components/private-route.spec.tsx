import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'
import PrivateRoute from '@presentation/components/private-route'
import { createMemoryHistory, MemoryHistory } from 'history'
import { SurveyList } from '@presentation/pages'
import { ApiContext } from '@presentation/contexts'
import { AccountModel } from '@domain/model'

describe('PrivateRoute', () => {
  let history: MemoryHistory
  const prepare = (account: AccountModel | null): void => {
    render(
        <ApiContext.Provider value={{ getCurrentAccount: () => account }} >
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path= "/" element={<SurveyList />} />
            </Route>
          </Routes>
        </Router>
      </ApiContext.Provider>
    )
  }

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
  })

  it('should redirect to /login if token is empty', () => {
    prepare(null)

    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if token is not empty', () => {
    prepare({ accessToken: 'any_token', name: 'any_name' })

    expect(history.location.pathname).toBe('/')
  })
})
