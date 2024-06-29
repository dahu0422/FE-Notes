const fs = require('fs')
const path = require('path')

// readStream默认的highWaterStream默认是64 * 1024
const readStream = fs.createReadStream(
  path.join(__dirname, '../assets/text.txt')
)
// 设置缓冲区大小为16 * 1024
const writeStream = fs.createWriteStream(
  path.join(__dirname, '../assets/text-backup.txt'),
  { highWaterMark: 16 * 1024 }
)
// 增加最大监听器数量
writeStream.setMaxListeners(20)

readStream.on('data', (chunk) => {
  writeStream.write(chunk)
  // 如果写入被暂停，等待drain
  if (!writeStream.write('')) {
    writeStream.once('drain', () => {
      console.log('Buffer drained, can write more data now.')
    })
  }
})
