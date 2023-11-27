import { createServer } from 'node:http'

import app from './app'

const server = createServer(app)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log('Server listening on port %s', PORT))

export default server
