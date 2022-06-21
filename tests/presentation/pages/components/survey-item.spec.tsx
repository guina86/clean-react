import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyItem } from '@presentation/pages/load-survey-list/components'
import { mockSurvey } from '@tests/data/mocks/survey'
import { IconName } from '@presentation/components'

describe('SurveyItem', () => {
  const survey = mockSurvey(true, new Date('2022-01-10T00:00:00'))

  beforeEach(() => {
    render(<SurveyItem survey={survey} />)
  })

  it('should render with correct values', () => {
    expect(screen.getByRole('image-icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByRole('date-day')).toHaveTextContent('10')
    expect(screen.getByRole('date-month')).toHaveTextContent('jan')
    expect(screen.getByRole('date-year')).toHaveTextContent('2022')
    expect(screen.getByRole('question-text')).toHaveTextContent(survey.question)
  })
})
