export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string
    answers: Answer[]
    date: Date
  }

  type Answer = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }
}
