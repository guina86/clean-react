import { PrivateRoute } from '@presentation/components'
import { ApiContext } from '@presentation/contexts'
import { AccountModel } from '@domain/model'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import React from 'react'

describe('PrivateRoute', () => {
  let history: MemoryHistory
  const renderSut = (account: AccountModel | null): void => {
    render(
      <ApiContext.Provider value={{ getCurrentAccount: () => account }} >
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<div />} />
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
    renderSut(null)

    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if token is not empty', () => {
    renderSut({ accessToken: 'any_token', name: 'any_name' })

    expect(history.location.pathname).toBe('/')
  })
})
