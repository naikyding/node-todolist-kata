const { createServer } = require('http')
const port = process.env.PORT || 8080
const serverListener = require('./serverListener')

const server = createServer(serverListener)
server.listen(port)