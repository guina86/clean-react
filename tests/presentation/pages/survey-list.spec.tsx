import { SurveyList } from '@presentation/pages'
import { ApiContext } from '@presentation/contexts'
import { LoadSurveyList } from '@domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { mockSurveyList } from '@tests/data/mocks'
import { fireEvent, render, RenderResult, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { mock } from 'jest-mock-extended'
import { Router } from 'react-router-dom'
import React from 'react'

describe('SurveyList', () => {
  const renderSut = (): RenderResult => render(
    <ApiContext.Provider value={{ getCurrentAccount: jest.fn(), setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )
  let history: MemoryHistory
  const loadSurveyListSpy = mock<LoadSurveyList>()
  const setCurrentAccountMock = jest.fn()

  beforeAll(() => {
    loadSurveyListSpy.loadAll.mockResolvedValue(mockSurveyList())
  })

  beforeEach(() => {
    jest.clearAllMocks()
    history = createMemoryHistory({ initialEntries: ['/'] })
  })

  it.only('should present 4 empty items on start', async () => {
    renderSut()

    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  it('should call LoadSurveyList', async () => {
    renderSut()
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(screen.queryByRole('empty-item'))
  })

  it('should render surveyItems on success', async () => {
    renderSut()
    await screen.findAllByRole('survey-item')
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(4)
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument()
  })

  it('should call LoadSurveyList on reload', async () => {
    loadSurveyListSpy.loadAll.mockRejectedValueOnce(new UnexpectedError())
    renderSut()
    await waitForElementToBeRemoved(screen.queryByRole('survey-list'))
    fireEvent.click(screen.getByRole('button'))
    await waitForElementToBeRemoved(screen.queryByRole('empty-item'))
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(2)
  })

  it('should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    loadSurveyListSpy.loadAll.mockRejectedValueOnce(error)
    renderSut()
    await waitForElementToBeRemoved(screen.queryByRole('survey-list'))
    expect(screen.getByRole('error-message')).toHaveTextContent(error.message)
  })

  it('should logout on AccessDeniedError', async () => {
    loadSurveyListSpy.loadAll.mockRejectedValueOnce(new AccessDeniedError())
    renderSut()
    await waitFor(() => {
      expect(history.location.pathname).toBe('/login')
    })
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(setCurrentAccountMock).toHaveBeenCalledTimes(1)
  })
})
