const express = require('express')
const { createUploadId, uploadFile } = require('../controller/uploadController')

const router = express.Router()

router.route('/create-upload-id').get(createUploadId)

router.route('/:id').post(uploadFile)

module.exports = router
