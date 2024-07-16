// fileHash、chunkHash、chunk、percent、start、end
const CHUNK_SIZE = 1024 * 1024

const inp = document.querySelector('input[type=file]')
inp.addEventListener('change', async (e) => {
  const file = e.target.files[0]
  let chunks = sliceFile(file, CHUNK_SIZE)
  const fileHash = await createFileHash(chunks)
  chunks = await Promise.all(
    chunks.map((chunk, index) =>
      createChunk(chunk, index, CHUNK_SIZE, fileHash, file.size)
    )
  )
  console.log('切片准备完成', chunks)
  let reqList = []
  chunks.forEach((chunk) => uploadChunk(chunk, reqList))
  console.log(reqList)
})

function sliceFile(file, chunkSize = 1024 * 1024) {
  const chunks = []
  for (let i = 0; i < file.size; i += chunkSize) {
    const blob = file.slice(i, i + chunkSize)
    chunks.push(blob)
  }
  return chunks
}

function createFileHash(chunks) {
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

function createChunk(chunk, index, chunkSize, fileHash, fileSize) {
  return new Promise((resolve) => {
    const start = index * chunkSize
    const end = Math.min(start + chunkSize, fileSize)
    const spark = new SparkMD5.ArrayBuffer()
    const reader = new FileReader()
    reader.onload = (e) => {
      spark.append(e.target.result)
      resolve({
        start,
        end,
        file: new File([chunk], `${fileHash}-${index}`),
        fileHash,
        chunkHash: spark.end(),
      })
    }
    reader.readAsArrayBuffer(chunk)
  })
}

function uploadChunk(chunk, reqList) {
  return new Promise((resolve) => {
    const formData = new FormData()
    formData.append('file', chunk.file)
    formData.append('fileHash', chunk.fileHash)
    formData.append('chunkHash', chunk.chunkHash)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/api/v1/upload/single')
    xhr.onload = (e) => {
      resolve(chunk)
    }
    xhr.send(formData)
    reqList.push(xhr)
  })
}
