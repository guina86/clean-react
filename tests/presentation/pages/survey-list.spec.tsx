import React from 'react'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { SurveyList } from '@presentation/pages'
import mock from 'jest-mock-extended/lib/Mock'
import { LoadSurveyList } from '@domain/usecases'
import { mockSurveyList } from '@tests/data/mocks/survey'
import { UnexpectedError } from '@domain/errors'

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
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  it('should call LoadSurveyList', async () => {
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(screen.queryByRole('empty-item'))
  })

  it('should render surveyItems on success', async () => {
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    await screen.findAllByRole('survey-item')
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(4)
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument()
  })

  it('should render error on failure', async () => {
    const error = new UnexpectedError()
    loadSurveyListSpy.loadAll.mockRejectedValueOnce(error)
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    await waitForElementToBeRemoved(screen.queryByRole('survey-list'))
    expect(screen.getByRole('error-message')).toHaveTextContent(error.message)
  })

  it('should call LoadSurveyList on reload', async () => {
    loadSurveyListSpy.loadAll.mockRejectedValueOnce(new UnexpectedError())
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    await waitForElementToBeRemoved(screen.queryByRole('survey-list'))
    fireEvent.click(screen.getByRole('button'))
    await waitForElementToBeRemoved(screen.queryByRole('empty-item'))
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(2)
  })
})
