const express = require('express')

const app = express()

// 中间件允许跨域访问
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // 允许所有源访问
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // 允许的HTTP方法
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type'
  ) // 允许的自定义请求头
  if (req.method === 'OPTIONS') {
    res.sendStatus(204) // 处理预检请求
  } else {
    next()
  }
})

app.get('/api/v1/components', (req, res) => {
  console.log(req)
  res.status(200).json({
    status: 'success',
    data: null,
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`ui server slide listening on port ${port}`)
})
