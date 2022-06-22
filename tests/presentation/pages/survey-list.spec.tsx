import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@presentation/pages'
import mock from 'jest-mock-extended/lib/Mock'
import { LoadSurveyList } from '@domain/usecases'
import { mockSurveyList } from '@tests/data/mocks/survey'

describe('SurveyList', () => {
  const loadSurveyListSpy = mock<LoadSurveyList>()

  beforeAll(() => {
    loadSurveyListSpy.loadAll.mockResolvedValue(mockSurveyList())
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should present 4 empty items on start', async () => {
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  it('should call LoadSurveyList', async () => {
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(1)
    await screen.findByRole('heading')
  })

  it('should render surveyItems ons success', async () => {
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    await screen.findAllByRole('survey-item')
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(4)
  })
})
