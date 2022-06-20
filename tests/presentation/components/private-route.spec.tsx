import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'
import PrivateRoute from '@presentation/components/private-route'
import { createMemoryHistory } from 'history'

describe('PrivateRoute', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  it('should redirect to /login if token is empty', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
        </Routes>
      </Router>
    )

    expect(history.location.pathname).toBe('/login')
  })
})
