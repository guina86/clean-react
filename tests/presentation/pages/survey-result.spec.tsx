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
  const history = createMemoryHistory({ initialEntries: ['/'] })

  const renderSut = (date?: Date): LoadSurveyResult.Model => {
    const surveyResult = mockSurveyResult(date)
    loadSurveyResultSpy.load.mockResolvedValue(surveyResult)
    render(
      <ApiContext.Provider value={{ getCurrentAccount: jest.fn(), setCurrentAccount: jest.fn() }}>
        <Router location={history.location} navigator={history}>
          <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
        </Router>
      </ApiContext.Provider>
    )
    return surveyResult
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should present correct initial state', async () => {
    renderSut()
    const surveyContainer = screen.getByRole('survey-container')
    expect(surveyContainer.childElementCount).toBe(0)
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument()
    await screen.findByRole('survey-container')
  })

  it('should call LoadSurveyResult', async () => {
    renderSut()
    expect(loadSurveyResultSpy.load).toHaveBeenCalledTimes(1)
    await screen.findByRole('survey-container')
  })

  it('should present SurveyResult data on success', async () => {
    const surveyResult = renderSut(new Date('2022-01-10T00:00:00'))
    await screen.findByRole('date-day')
    expect(screen.getByRole('date-day')).toHaveTextContent('10')
    expect(screen.getByRole('date-month')).toHaveTextContent('jan')
    expect(screen.getByRole('date-year')).toHaveTextContent('2022')
    expect(screen.getByRole('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByRole('answers').childElementCount).toBe(2)
    const answersWraps = screen.getAllByRole('answer-wrap')
    expect(answersWraps[0]).toHaveClass('active')
    expect(answersWraps[1]).not.toHaveClass('active')
    const images = screen.getAllByRole('answer-image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.getAllByRole('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.getAllByRole('answer-percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })
})
