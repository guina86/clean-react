import React from 'react'
import { render } from '@testing-library/react'
import Login from '@presentation/pages/login'

describe('Login Component', () => {
  it('should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const statusWrap = getByTestId('statusWrap')
    expect(statusWrap.childElementCount).toBe(0)
  })
})
