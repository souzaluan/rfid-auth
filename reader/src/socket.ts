import { Server } from 'socket.io'

import server from './server'

import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 9600,
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  parser.on('data', (data) => {
    socket.broadcast.emit('received-id', data)
  })
})
