import { Server } from 'socket.io'

import server from './server'

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  return console.log('new connection => %s', socket.id)
})
