import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Header from '@presentation/components/header'
import { ApiContext } from '@presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('Header', () => {
  let history: MemoryHistory
  const setCurrentAccountMock = jest.fn()
  const renderSut = (): void => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )
  }

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
    jest.clearAllMocks()
  })

  it('should call setCurrentAccount with null', () => {
    renderSut()
    fireEvent.click(screen.getByRole('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(setCurrentAccountMock).toHaveBeenCalledTimes(1)
    expect(history.location.pathname).toBe('/login')
  })
})
