const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
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
