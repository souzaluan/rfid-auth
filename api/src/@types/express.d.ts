import 'express'

interface User {
  id: string
  email: string
}

declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}
