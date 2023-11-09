import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import { connectDb } from '../typeorm/helpers/connection'

const APP_PORT = process.env.APP_PORT

const startServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  app.listen(APP_PORT, () => {
    return console.log('Server is running on port', APP_PORT)
  })
}

connectDb(startServer)
