export type RemoteSurveyResultModel = {
  question: string
  answers: RemoteSurveyResultAnswerModel[]
  date: string
}

export type RemoteSurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
