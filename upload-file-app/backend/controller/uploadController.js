const multer = require('multer')

const multerStorage = multer.diskStorage({
  // 文件存储的目录
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  // 文件存储的名称
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

exports.signleUpload = (req, res) => {
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

exports.multipleUplod = (req, res) => {
  try {
    const upload = multer({ storage: multerStorage }).array('file')
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
