const inp = document.querySelector('input[type=file]')
let fileSize = 0
let progress = 0
inp.addEventListener('change', async (e) => {
  const file = e.target.files[0]
  fileSize = file.size
  console.log(fileSize)
  let chunks = createChunks(file)
  const hash = await createHash(chunks)
  chunks = chunks.map((chunk, index) => createNewFile(chunk, index, hash))
  uploadBlob(chunks)
})

/**
 * 文件切块
 * @param {file} file 文件
 * @param {number} chunkSize 切块大小
 * @returns 切块Blob数组
 */
function createChunks(file, chunkSize = 1024 * 1024) {
  const chunks = []
  for (let i = 0; i < file.size; i += chunkSize) {
    const blob = file.slice(i, i + chunkSize)
    chunks.push(blob)
  }
  return chunks
}

/**
 * 使用sparkMD5，读取切块内容，生成hash
 * @param {Array} chunks 切块数组
 * @returns hash值
 */
function createHash(chunks) {
  return new Promise((resolve) => {
    const spark = new SparkMD5()
    function _read(i) {
      if (i >= chunks.length) {
        resolve(spark.end())
        return
      }
      const blob = chunks[i]
      const reader = new FileReader()
      reader.onload = (e) => {
        const bytes = e.target.result
        spark.append(bytes)
        _read(i + 1)
      }
      reader.readAsArrayBuffer(blob)
    }
    _read(0)
  })
}

const createNewFile = (chunk, index, hash) => ({
  file: new File([chunk], `${hash}-${index}`),
  percent: 0,
})

/**
 * @desc 上传切片
 * @param {Array} chunks 切块数组
 * @param {string} hash has值
 */
function uploadBlob(chunks) {
  chunks.forEach((f) => {
    const formData = new FormData()
    formData.append('file', f.file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/api/v1/upload/single')
    xhr.onload = (e) => {
      console.log('上传成功')
    }
    xhr.upload.onprogress = (e) => {
      f.percent = (e.loaded / e.total).toFixed(2)
      updateTotalProgress(chunks)
    }
    xhr.send(formData)
  })
}

function updateTotalProgress(chunks) {
  const loadedSize = chunks.reduce((pre, cur) => {
    return pre + cur.percent * cur.file.size
  }, 0)
  progress = Math.floor((loadedSize / fileSize) * 100)
  console.log(progress)
}
