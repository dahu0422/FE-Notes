const express = require('express')
const {
  createUploadId,
  uploadFile,
  mergeFile,
} = require('../controller/uploadController')

const router = express.Router()

router.route('/create-upload-id').get(createUploadId)

router.route('/:id').post(uploadFile)
router.route('/merge-file/:id').post(mergeFile)

module.exports = router
