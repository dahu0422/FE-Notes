const $ = document.querySelector.bind(document)
const doms = {
  container: $('.upload'),
  select: $('.upload-select'),
  selectFile: $('.upload-select input[type=file]'),
  progress: $('.upload-progress'),
  cancelBtn: $('.progress-bar button'),
  delBtn: $('.upload-result button'),
  img: $('img'),
}
function showArea(areaName) {
  doms.container.className = `upload ${areaName}`
}
// 进度更改
function setProgress(value) {
  doms.progress.style.setProperty('--percent', value)
}

doms.select.addEventListener('click', () => {
  doms.selectFile.click()
})

let cancelUpload = null
function cancel() {
  cancelUpload && cancelUpload()
  showArea('select')
  doms.selectFile.value = null
}

// 监听文件变化，生成图片预览图，切换至上传进度样式
doms.selectFile.addEventListener('change', (e) => {
  showArea('progress')
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    doms.img.src = e.target.result
  }
  reader.readAsDataURL(file)
  cancelUpload = upload(
    file,
    function (percent) {
      setProgress(percent)
    },
    function (resp) {
      showArea('result')
    }
  )
})

/**
 * 创建表单，记录上传进度
 * @param {file} file file文件
 * @param {funciton} onProgress 更新进度回调
 * @param {function} onFinish 上传结束回调
 * @return {function} 中断函数事件
 */
function upload(file, onProgress, onFinish) {
  const form = new FormData()
  form.append('file', file)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:3000/api/v1/upload/single')
  xhr.onload = (e) => {
    const resp = JSON.parse(xhr.responseText)
    onFinish(resp)
  }
  xhr.upload.onprogress = (e) => {
    const percent = Math.floor((e.loaded / e.total) * 100)
    onProgress(percent)
  }
  xhr.send(file)
  return function () {
    xhr.abort()
  }
}

// 点击取消上传按钮清空定时器
doms.cancelBtn.addEventListener('click', () => {
  cancel()
})
// 点击删除按钮隐藏图片
doms.delBtn.addEventListener('click', () => {
  cancel()
})
