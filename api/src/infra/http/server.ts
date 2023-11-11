import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'
import '../../container'

import express from 'express'
import cors from 'cors'

import { connectDb } from '../typeorm/helpers/connection'
import { routes } from './routes'
import { error } from '../../middlewares/error'

const APP_PORT = process.env.APP_PORT

const startServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
  app.use('/api', routes)
  app.use(error)

  app.listen(APP_PORT, () => {
    return console.log('Server is running on port', APP_PORT)
  })
}

connectDb(startServer)
