import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyItem } from '@presentation/pages/load-survey-list/components'
import { mockSurvey } from '@tests/data/mocks/survey'
import { IconName } from '@presentation/components'
import { LoadSurveyList } from '@domain/usecases'

describe('SurveyItem', () => {
  const prepare = (didAnswer: boolean): LoadSurveyList.Model => {
    const survey = mockSurvey(didAnswer)
    render(<SurveyItem survey={survey} />)
    return survey
  }

  it('should render with correct values', () => {
    const survey = prepare(true)
    expect(screen.getByRole('image-icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByRole('question-text')).toHaveTextContent(survey.question)
  })

  it('should render with correct values', () => {
    const survey = prepare(false)
    expect(screen.getByRole('image-icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByRole('question-text')).toHaveTextContent(survey.question)
  })
})
