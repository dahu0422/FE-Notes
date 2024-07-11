/**
 * 上传文件，更新进度，处理上传成功事件
 * @param {file} file 文件
 * @param {function} onProgress 进度回调
 * @param {function} onFinish 上传结束回调
 * @return {function} 返回上传中断事件
 */
export function uploadFile(file, onProgress, onFinish) {
  const form = new FormData()
  form.append('file', file)

  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:3000/api/v1/upload/single')
  xhr.upload.onprogress = (e) => {
    const percent = Math.floor((e.loaded / e.total) * 100)
    onProgress(percent)
  }
  xhr.onload = () => {
    const resp = JSON.parse(xhr.responseText)
    onFinish(resp)
  }
  xhr.send(form)
  return function () {
    xhr.abort()
  }
}
