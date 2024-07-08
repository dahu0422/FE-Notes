const path = require('path')
const fs = require('fs')

const mergeFileChunk = async () => {
  const files = fs
    .readdirSync(path.join(__dirname, '../uploads'))
    .filter((name) => name.startsWith('1719767833023-9c696dd1bc27'))
    .sort((a, b) => {
      a.split('-')[1] - b.split('-')[1]
    })
    .map((name) => path.join(__dirname, '../uploads', name))

  const writeStream = fs.createWriteStream(
    path.join(__dirname, '../uploads/file-back.mp4')
  )

  // 使用 async/await 等待每个文件写入完成
  for (const fileName of files) {
    const readStream = fs.createReadStream(fileName)
    await new Promise((resolve, reject) => {
      readStream.on('end', () => {
        console.log(`${fileName}写入完成`)
        resolve(`${fileName}写入完成`)
      })
      readStream.on('error', reject)
      readStream.pipe(writeStream, { end: false })
    })
  }

  // 在所有文件都写入后，关闭写入流
  writeStream.end()

  return '123'
}

const val = mergeFileChunk()
console.log(val)
