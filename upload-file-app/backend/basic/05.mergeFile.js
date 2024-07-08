const fs = require('fs')
const path = require('path')

// 定义读取和写入的文件路径
const file1 = path.join(__dirname, '../assets/file_1.txt')
const file2 = path.join(__dirname, '../assets/file_2.txt')
const outputFile = path.join(__dirname, '../assets/text-backup.txt')

const readStream1 = fs.createReadStream(file1)
const readStream2 = fs.createReadStream(file2)
const writeStream = fs.createWriteStream(outputFile)

readStream1.pipe(writeStream, { end: false })

readStream1.on('data', (chunk) => {
  console.log('读取文件file_1.txt')
  console.log(chunk.toString())
})

readStream1.on('end', () => {
  console.log('file_1.txt 文件读取结束')

  readStream2.pipe(writeStream)
  readStream2.on('data', (chunk) => {
    console.log('读取文件file_2.txt')
    console.log(chunk.toString())
  })

  readStream2.on('end', () => {
    console.log('file_2.txt 文件读取结束')
    writeStream.end()
  })

  readStream2.on('error', (err) => {
    console.log(err)
  })
})

readStream1.on('error', (err) => {
  console.log(err)
})
