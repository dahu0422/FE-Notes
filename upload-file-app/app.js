const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')
const crypto = require('crypto') // 引入crypto模块用于生成唯一标识

const app = express()

app.get('/beforeUpload/', (req, res) => {
  // 生成一个唯一标识，这里使用时间和随机数的组合
  const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`
  res.status(200).json({
    status: 'success',
    data: { id: uniqueSuffix },
  })
})

const multerStorage = multer.diskStorage({
  // 文件存储的目录
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  // 文件存储的名称
  filename: (req, file, cb) => {
    const fileName = `${Buffer.from(file.originalname, 'latin1').toString(
      'utf-8'
    )}`
    cb(null, fileName)
  },
})
const upload = multer({ storage: multerStorage })
app.post('/upload/:id', upload.single('file'), (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'ok',
  })
})

app.get('/mergeFile/:id', (req, res) => {
  const fileName = req.params.id
  const mergedFilePath = `${fileName}.mp4`
  // 使用追加模式打开或创建文件
  fs.writeFileSync(path.join(__dirname, '/uploads', mergedFilePath), '', {
    flag: 'w',
  }) // 初始化合并文件，清空或创建
  fs.readdirSync(path.join(__dirname, '/uploads'))
    .map((chunkPath) => {
      if (chunkPath.startsWith(fileName)) {
        return chunkPath
      }
    })
    .sort((a, b) => {
      return a - b
    })
    .forEach((chunkPath) => {
      console.log(chunkPath)
      let data = fs.readFileSync(path.join(__dirname, '/uploads', chunkPath))
      fs.appendFileSync(path.join(__dirname, '/uploads', mergedFilePath), data)
    })
  res.status(200).json({
    status: 'ok',
    data: 'ok',
  })
})

app.use(express.static(path.join(__dirname, 'public')))

const port = 3000
app.listen(port, () => {
  console.log(`upload file app is running on port ${port}`)
})
