import { DefaultError } from './DefaultError'

export class BadRequestError extends DefaultError {
  constructor(message = 'Bad request.') {
    super(message, 400)
  }
}
