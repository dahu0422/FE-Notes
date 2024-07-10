const express = require('express')
const {
  signleUpload,
  multipleUplod,
} = require('../controller/uploadController')

const router = express.Router()

router.route('/single').post(signleUpload)
router.route('/multiple').post(multipleUplod)

module.exports = router
