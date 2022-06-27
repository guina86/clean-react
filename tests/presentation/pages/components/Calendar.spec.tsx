import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@presentation/components'

describe('Calendar', () => {
  const renderSut = (date: Date): void => {
    render(<Calendar date={date} />)
  }

  it('should render with correct values', () => {
    renderSut(new Date('2022-01-10T00:00:00'))
    expect(screen.getByRole('date-day')).toHaveTextContent('10')
    expect(screen.getByRole('date-month')).toHaveTextContent('jan')
    expect(screen.getByRole('date-year')).toHaveTextContent('2022')
  })

  it('should render with correct values', () => {
    renderSut(new Date('2020-10-02T00:00:00'))
    expect(screen.getByRole('date-day')).toHaveTextContent('02')
    expect(screen.getByRole('date-month')).toHaveTextContent('out')
    expect(screen.getByRole('date-year')).toHaveTextContent('2020')
  })
})
