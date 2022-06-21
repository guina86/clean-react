import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyItem } from '@presentation/pages/load-survey-list/components'
import { mockSurvey } from '@tests/data/mocks/survey'
import { IconName } from '@presentation/components'
import { SurveyModel } from '@domain/model'

describe('SurveyItem', () => {
  const prepare = (didAnswer: boolean, date: Date): SurveyModel => {
    const survey = mockSurvey(didAnswer, date)
    render(<SurveyItem survey={survey} />)
    return survey
  }

  it('should render with correct values', () => {
    const survey = prepare(true, new Date('2022-01-10T00:00:00'))
    expect(screen.getByRole('image-icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByRole('date-day')).toHaveTextContent('10')
    expect(screen.getByRole('date-month')).toHaveTextContent('jan')
    expect(screen.getByRole('date-year')).toHaveTextContent('2022')
    expect(screen.getByRole('question-text')).toHaveTextContent(survey.question)
  })

  it('should render with correct values', () => {
    const survey = prepare(false, new Date('2020-10-02T00:00:00'))
    expect(screen.getByRole('image-icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByRole('date-day')).toHaveTextContent('02')
    expect(screen.getByRole('date-month')).toHaveTextContent('out')
    expect(screen.getByRole('date-year')).toHaveTextContent('2020')
    expect(screen.getByRole('question-text')).toHaveTextContent(survey.question)
  })
})
