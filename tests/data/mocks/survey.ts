import { SurveyModel } from '@domain/model'
import { faker } from '@faker-js/faker'

export const makeSurvey = (): SurveyModel => {
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
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean()
  }
}

export const makeSurveyList = (): SurveyModel[] => [...Array(4)].map(() => makeSurvey())
