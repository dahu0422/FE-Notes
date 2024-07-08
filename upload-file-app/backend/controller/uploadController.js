const fs = require('fs')
const crypto = require('crypto') // 引入crypto模块用于生成唯一标识
const multer = require('multer')

// 上传切片前生成唯一标识
exports.createUploadId = (req, res) => {
  const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`
  res.status(200).json({
    status: 'success',
    data: { id: uniqueSuffix },
  })
}

const multerStorage = multer.diskStorage({
  // 文件存储的目录
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  // 文件存储的名称
  filename: (req, file, cb) => {
    console.log(file)
    const fileName = `${Buffer.from(file.originalname, 'latin1').toString(
      'utf-8'
    )}`
    cb(null, fileName)
  },
})
exports.uploadFile = (req, res) => {
  try {
    const upload = multer({ storage: multerStorage }).single('file')
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      }
    })
    res.status(200).json({
      status: 'success',
      data: 'ok',
    })
  } catch (error) {
    console.log(error)
  }
}

exports.uploadSingleFile = (req, res) => {
  console.log('接收到请求')
  // console.log(12)
  // try {
  //   const upload = multer({ storage: multerStorage }).single('file')
  //   upload(req, res, (err) => {
  //     if (err) {
  //       return res.status(400).json({ error: err.message })
  //     }
  //   })
  //   res.status(200).json({
  //     status: 'success',
  //     data: 'ok',
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
}
