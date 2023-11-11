import { DefaultError } from './DefaultError'

export class UnauthorizedError extends DefaultError {
  constructor(message = 'Unauthorized error.') {
    super(message, 401)
  }
}
