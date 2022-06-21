import { SurveyModel } from '@domain/model'
import { faker } from '@faker-js/faker'

export const mockSurvey = (didAnswer?: boolean, date?: Date): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(4)
      },
      {
        image: faker.internet.url(),
        answer: faker.random.words(4)
      },
      {
        answer: faker.random.words(5)
      },
      {
        image: faker.internet.url(),
        answer: faker.random.words(4)
      }
    ],
    date: date !== undefined ? date : faker.date.recent(),
    didAnswer: didAnswer !== undefined ? didAnswer : faker.datatype.boolean()
  }
}

export const mockSurveyList = (): SurveyModel[] => [...Array(4)].map(() => mockSurvey())
