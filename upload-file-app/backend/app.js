const path = require('path')
const express = require('express')
const cors = require('cors')

const uploadFileRouter = require('./route/uploadRoutes')
const app = express()

app.use(cors())
app.use('/api/v1/upload', uploadFileRouter)
app.use(express.static(path.join(__dirname, 'public')))

const port = 3000
app.listen(port, () => {
  console.log(`upload file app is running on port ${port}`)
})
