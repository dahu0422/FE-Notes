// 创建一个大文件
const fs = require('fs')

const writeStream = fs.createWriteStream('../assets/bigText.txt')

for (let i = 0; i < 10000000; i++) {
  writeStream.write(`这是第${i}行\n`)
}
writeStream.end()
console.log('写入完成')
