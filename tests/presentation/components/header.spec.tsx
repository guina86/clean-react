import { Header } from '@presentation/components'
import { ApiContext } from '@presentation/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { Router } from 'react-router-dom'
import React from 'react'

describe('Header', () => {
  let history: MemoryHistory
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn()
  const renderSut = (): void => {
    render(
      <ApiContext.Provider value={{ getCurrentAccount: getCurrentAccountMock, setCurrentAccount: setCurrentAccountMock }}>
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

  it('should render username correctly', () => {
    const account = { accessToken: faker.datatype.uuid(), name: faker.name.findName() }
    getCurrentAccountMock.mockReturnValueOnce(account)

    renderSut()

    expect(screen.getByRole('username')).toHaveTextContent(account.name)
  })
})
