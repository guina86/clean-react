import { RemoteLoadSurveyResult } from '@data/usecases'
import { LoadSurveyResult } from '@domain/usecases'
import { faker } from '@faker-js/faker'

export const mockSurveyResult = (date?: Date): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(3),
      count: faker.datatype.number(),
      percent: 100,
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.random.words(3),
      count: faker.datatype.number(),
      percent: 0,
      isCurrentAccountAnswer: false
    }
  ],
  date: date ?? faker.date.recent()
})

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Model => {
  const surveyResult = mockSurveyResult()
  return { ...surveyResult, date: surveyResult.date.toISOString() }
}
