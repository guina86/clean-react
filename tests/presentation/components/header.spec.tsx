import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Header from '@presentation/components/header'
import { ApiContext } from '@presentation/contexts'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('Header', () => {
  it('should call setCurrentAccount with null', () => {
    const setCurrentAccountMock = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )

    fireEvent.click(screen.getByRole('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(setCurrentAccountMock).toHaveBeenCalledTimes(1)
    expect(history.location.pathname).toBe('/login')
  })
})
