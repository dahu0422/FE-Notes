const express = require('express')
const {
  createUploadId,
  uploadFile,
  mergeFile,
  uploadSingleFile,
} = require('../controller/uploadController')

const router = express.Router()

router.route('/create-upload-id').get(createUploadId)

router.route('/:id').post(uploadFile)
router.route('/single').post(uploadSingleFile)

module.exports = router
