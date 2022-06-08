import React from 'react'
import { render } from '@testing-library/react'
import Login from '@presentation/pages/login'

describe('Login Component', () => {
  it('should start with initial state', () => {
    const { getByTestId, getByRole } = render(<Login />)
    const statusWrap = getByTestId('statusWrap')
    expect(statusWrap.childElementCount).toBe(0)
    const submitbutton = getByRole('button') as HTMLButtonElement
    expect(submitbutton.disabled).toBe(true)
  })
})
