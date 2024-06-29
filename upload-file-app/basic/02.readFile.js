// 查看使用readFile读取文件的内存消耗
const fs = require('fs')
const http = require('http')
const server = http.createServer()

server.on('request', (request, response) => {
  fs.readFile('../assets/bigText.txt', (error, data) => {
    if (error) throw error
    response.end(data)
  })
})

server.listen(8889)
