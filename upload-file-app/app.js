const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')

const multerStorage = multer.diskStorage({
  // 文件存储的目录
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  // 文件存储的名称
  filename: (req, file, cb) => {
    console.log(file)
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf-8')
    cb(null, fileName)
  },
})

const upload = multer({ storage: multerStorage })

app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'ok',
  })
})

app.use(express.static(path.join(__dirname, 'public')))

const port = 3000
app.listen(port, () => {
  console.log(`upload file app is running on port ${port}`)
})
