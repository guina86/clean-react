import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from '@presentation/pages/login'

describe('Login Component', () => {
  let sut: RenderResult

  beforeEach(() => {
    sut = render(<Login />)
  })

  it('should start with initial state', () => {
    const statusWrap = sut.getByTestId('statusWrap')
    expect(statusWrap.childElementCount).toBe(0)
    const submitbutton = sut.getByRole('button') as HTMLButtonElement
    expect(submitbutton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
