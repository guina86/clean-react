import { SurveyResult } from '@presentation/pages'
import { ApiContext } from '@presentation/contexts'
import { LoadSurveyResult, SaveSurveyResult } from '@domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { mockSurveyResult } from '@tests/data/mocks'
import { fireEvent, render, RenderResult, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { mock } from 'jest-mock-extended'
import { Router } from 'react-router-dom'
import React from 'react'

describe('SurveyResult', () => {
  const renderSut = (): RenderResult => render(
    <ApiContext.Provider value={{ getCurrentAccount: jest.fn(), setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={saveSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  )
  let history: MemoryHistory
  const loadSurveyResultSpy = mock<LoadSurveyResult>()
  const saveSurveyResultSpy = mock<SaveSurveyResult>()
  const surveyResult = mockSurveyResult(new Date('2022-01-10T00:00:00'))
  const setCurrentAccountMock = jest.fn()

  beforeAll(() => {
    loadSurveyResultSpy.load.mockResolvedValue(surveyResult)
    saveSurveyResultSpy.save.mockResolvedValue(surveyResult)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    history = createMemoryHistory({ initialEntries: ['/', '/surveys/any_id'], initialIndex: 1 })
  })

  it('should present correct initial state', async () => {
    renderSut()

    const surveyContainer = await screen.findByRole('survey-container')
    expect(surveyContainer.childElementCount).toBe(0)
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument()
  })

  it('should call LoadSurveyResult', async () => {
    renderSut()

    await screen.findByRole('survey-container')
    expect(loadSurveyResultSpy.load).toHaveBeenCalledTimes(1)
  })

  it('should present SurveyResult data on success', async () => {
    renderSut()

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

  it('should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    loadSurveyResultSpy.load.mockRejectedValueOnce(error)
    renderSut()

    const errorComponent = await screen.findByRole('error-message')
    expect(errorComponent).toHaveTextContent(error.message)
    expect(screen.queryByRole('question')).not.toBeInTheDocument()
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
  })

  it('should logout on AccessDeniedError', async () => {
    loadSurveyResultSpy.load.mockRejectedValueOnce(new AccessDeniedError())
    renderSut()

    await waitFor(() => { expect(history.location.pathname).toBe('/login') })
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(setCurrentAccountMock).toHaveBeenCalledTimes(1)
  })

  it('should call LoadSurveyResult on reload', async () => {
    loadSurveyResultSpy.load.mockRejectedValueOnce(new UnexpectedError())
    renderSut()

    await screen.findByRole('error-message')
    fireEvent.click(screen.getByRole('button'))

    await screen.findByRole('survey-container')
    expect(loadSurveyResultSpy.load).toHaveBeenCalledTimes(2)
  })

  it('should go to SurveyList on back button click', async () => {
    renderSut()

    await screen.findByRole('question')
    fireEvent.click(screen.getByRole('back-button'))

    expect(history.location.pathname).toBe('/')
  })

  it('should not present loading on active answer click', async () => {
    renderSut()

    const answersWraps = await screen.findAllByRole('answer-wrap')
    fireEvent.click(answersWraps[0])

    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
  })

  it('should call SaveSurveyResult on non active answer click', async () => {
    renderSut()

    const answersWraps = await screen.findAllByRole('answer-wrap')
    fireEvent.click(answersWraps[1])

    expect(screen.getByRole('loading')).toBeInTheDocument()
    await waitForElementToBeRemoved(screen.queryByRole('loading'))
    expect(saveSurveyResultSpy.save).toHaveBeenCalledWith({
      answer: surveyResult.answers[1].answer
    })
  })

  it('should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    saveSurveyResultSpy.save.mockRejectedValueOnce(error)
    renderSut()

    const answersWraps = await screen.findAllByRole('answer-wrap')
    fireEvent.click(answersWraps[1])

    const errorComponent = await screen.findByRole('error-message')
    expect(errorComponent).toHaveTextContent(error.message)
    expect(screen.queryByRole('question')).not.toBeInTheDocument()
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
  })

  it('should logout on AccessDeniedError', async () => {
    const error = new AccessDeniedError()
    saveSurveyResultSpy.save.mockRejectedValueOnce(error)
    renderSut()

    const answersWraps = await screen.findAllByRole('answer-wrap')
    fireEvent.click(answersWraps[1])

    await waitFor(() => { expect(history.location.pathname).toBe('/login') })
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(setCurrentAccountMock).toHaveBeenCalledTimes(1)
  })

  it('should present SurveyResult data on SaveSurveyResult success', async () => {
    const newResult = { ...surveyResult, answers: [{ ...surveyResult.answers[0] }, { ...surveyResult.answers[1] }] }
    newResult.answers[0].isCurrentAccountAnswer = false
    newResult.answers[0].percent = 0
    newResult.answers[1].isCurrentAccountAnswer = true
    newResult.answers[1].percent = 100
    saveSurveyResultSpy.save.mockResolvedValueOnce(newResult)
    renderSut()

    let answersWraps = await screen.findAllByRole('answer-wrap')
    expect(answersWraps[0]).toHaveClass('active')
    expect(answersWraps[1]).not.toHaveClass('active')
    let percents = screen.getAllByRole('answer-percent')
    expect(percents[0]).toHaveTextContent('100%')
    expect(percents[1]).toHaveTextContent('0%')

    fireEvent.click(answersWraps[1])
    await waitForElementToBeRemoved(screen.queryByRole('loading'))

    answersWraps = screen.getAllByRole('answer-wrap')
    expect(answersWraps[0]).not.toHaveClass('active')
    expect(answersWraps[1]).toHaveClass('active')
    percents = screen.getAllByRole('answer-percent')
    expect(percents[0]).toHaveTextContent('0%')
    expect(percents[1]).toHaveTextContent('100%')
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
  })

  it('should prevent multiple answer clicks', async () => {
    renderSut()

    const answersWraps = await screen.findAllByRole('answer-wrap')
    fireEvent.click(answersWraps[1])
    fireEvent.click(answersWraps[1])

    await waitForElementToBeRemoved(screen.queryByRole('loading'))
    expect(saveSurveyResultSpy.save).toHaveBeenCalledTimes(1)
  })
})
