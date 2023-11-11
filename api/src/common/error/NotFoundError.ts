import { DefaultError } from './DefaultError'

export class NotFoundError extends DefaultError {
  constructor(message = 'Resource not found.') {
    super(message, 404)
  }
}
