const fs = require('fs')
const http = require('http')

const server = http.createServer()

server.on('request', (request, response) => {
  const stream = fs.createReadStream('../assets/bigText.txt')
  stream.pipe(response)
})
server.listen(8888)
