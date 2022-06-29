export type SurveyResultModel = {
  question: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

export type SurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
