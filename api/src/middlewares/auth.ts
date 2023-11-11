import { NextFunction, Request, Response } from 'express'

import { container } from 'tsyringe'
import { decode, verify } from 'jsonwebtoken'

import { UnauthorizedError } from '../common/error/UnauthorizedError'
import { GetUserService } from '../modules/users/services/GetUserService'

interface IToken {
  sub: string
  exp: number
}

export const authenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers

  if (!authorization) {
    throw new UnauthorizedError('Usuário não possui autorização')
  }

  const [, token] = authorization.split(' ')

  const { exp } = decode(token) as IToken

  if (exp * 1000 < new Date().getTime()) {
    throw new UnauthorizedError('Token expirado')
  }

  const { sub } = verify(token, process.env.JWT_SECRET as string) as IToken

  const getUserService = container.resolve(GetUserService)
  const user = await getUserService.execute(sub)

  if (!user) {
    throw new UnauthorizedError('Usuário não possui autorização.')
  }

  request.user = {
    id: user.id,
    email: user.email,
  }

  return next()
}
