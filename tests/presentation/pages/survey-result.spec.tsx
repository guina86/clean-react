import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyResult } from '@presentation/pages'
import { ApiContext } from '@presentation/contexts'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import mock from 'jest-mock-extended/lib/Mock'
import { LoadSurveyResult } from '@domain/usecases'
import { mockSurveyResult } from '@tests/data/mocks/survey'

describe('SurveyResult', () => {
  const loadSurveyResultSpy = mock<LoadSurveyResult>()
  const surveyResult = mockSurveyResult()
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const renderSut = (): void => {
    render(
      <ApiContext.Provider value={{ getCurrentAccount: jest.fn(), setCurrentAccount: jest.fn() }}>
        <Router location={history.location} navigator={history}>
          <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
        </Router>
      </ApiContext.Provider>
    )
  }

  beforeAll(() => {
    loadSurveyResultSpy.load.mockResolvedValue(surveyResult)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should present correct initial state', async () => {
    renderSut()
    const surveyContainer = screen.getByRole('survey-container')
    expect(surveyContainer.childElementCount).toBe(0)
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument()
  })

  it('should call LoadSurveyResult', async () => {
    renderSut()
    expect(loadSurveyResultSpy.load).toHaveBeenCalledTimes(1)
  })
})
