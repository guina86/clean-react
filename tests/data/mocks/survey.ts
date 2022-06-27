import { RemoteLoadSurveyList, RemoteLoadSurveyResult } from '@data/usecases'
import { LoadSurveyList } from '@domain/usecases'
import { faker } from '@faker-js/faker'

export const mockSurvey = (didAnswer?: boolean, date?: Date): LoadSurveyList.Model => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    date: date !== undefined ? date : faker.date.recent(),
    didAnswer: didAnswer !== undefined ? didAnswer : faker.datatype.boolean()
  }
}

export const mockSurveyList = (): LoadSurveyList.Model[] => [...Array(4)].map(() => mockSurvey())

export const mockRemoteSurvey = (didAnswer?: boolean, date?: string): RemoteLoadSurveyList.Model => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    date: date !== undefined ? date : faker.date.recent().toISOString(),
    didAnswer: didAnswer !== undefined ? didAnswer : faker.datatype.boolean()
  }
}

export const mockRemoteSurveyList = (): RemoteLoadSurveyList.Model[] => [...Array(4)].map(() => mockRemoteSurvey())

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(3),
      count: faker.datatype.number(),
      percent: faker.datatype.number({ min: 0, max: 100 }),
      isCurrentAccountAnswer: false
    },
    {
      answer: faker.random.words(3),
      count: faker.datatype.number(),
      percent: faker.datatype.number({ min: 0, max: 100 }),
      isCurrentAccountAnswer: true
    },
    {
      image: faker.internet.url(),
      answer: faker.random.words(3),
      count: faker.datatype.number(),
      percent: faker.datatype.number({ min: 0, max: 100 }),
      isCurrentAccountAnswer: false
    }
  ],
  date: faker.date.recent().toISOString()
})
