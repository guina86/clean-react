import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@presentation/pages'

describe('SurveyList', () => {
  beforeEach(() => {
    render(<SurveyList />)
  })

  it('should present 4 empty items on start', () => {
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
