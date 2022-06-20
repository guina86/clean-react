import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@presentation/pages'
import mock from 'jest-mock-extended/lib/Mock'
import { LoadSurveyList } from '@domain/usecases'

describe('SurveyList', () => {
  const loadSurveyListSpy = mock<LoadSurveyList>()

  beforeAll(() => {
    loadSurveyListSpy.loadAll.mockResolvedValue([])
  })

  beforeEach(() => {
    jest.clearAllMocks()
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  })

  it('should present 4 empty items on start', () => {
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  it('should call LoadSurveyList', () => {
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(1)
  })
})
