import { CelebrateError } from 'celebrate'
import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'

import { DefaultError } from '../common/error/DefaultError'

export const error = (
  error: DefaultError,
  _: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  console.log(error)

  try {
    if (error instanceof CelebrateError) {
      const errorBody = error.details.get('body')
      const errorParams = error.details.get('params')
      const errorQuery = error.details.get('query')

      const errorDetails =
        errorBody?.details[0] ||
        errorParams?.details[0] ||
        errorQuery?.details[0]

      return response.status(400).json({
        message: errorDetails?.message ?? 'Body validation error',
      })
    }

    if (error instanceof JsonWebTokenError) {
      return response.status(400).json({ message: error.message })
    }

    const { status, message } = error

    return response.status(status).json({ message })
  } catch {
    return response.status(500).json({ message: 'Internal Server Error' })
  }
}
