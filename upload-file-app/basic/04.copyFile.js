const fs = require('fs')
const path = require('path')

const readStream = fs.createReadStream(
  path.join(__dirname, '../assets/text.txt')
)
const writeStream = fs.createWriteStream(
  path.join(__dirname, '../assets/text-backup.txt')
)
let count = 1

readStream.pipe(writeStream)
readStream.on('data', (chunk) => {
  console.log(`第${count++}读文件`)
  console.log(chunk.toString())
})

readStream.on('end', () => {
  console.log('文件读取完毕')
})
