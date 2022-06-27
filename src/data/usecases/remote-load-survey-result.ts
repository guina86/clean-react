import { HttpGetClient, HttpStatusCode } from '@data/protocols'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load (): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    answers: Answer[]
    date: string
    isCurrentAccountAnswer: boolean
  }

  type Answer = {
    image?: string
    answer: string
    count: number
    percent: number
  }
}
