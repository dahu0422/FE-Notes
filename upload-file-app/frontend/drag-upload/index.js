const container = document.querySelector('.container')

// 监听 dragenter 事件，阻止默认事件
container.addEventListener('dragenter', (e) => {
  e.preventDefault()
  e.target.classList.add('draging')
})

// 监听 dragover 事件，阻止默认事件
container.addEventListener('dragover', (e) => {
  e.preventDefault()
})

container.addEventListener('dragleave', (e) => {
  e.target.classList.remove('draging')
})

// 监听 drop 事件，阻止默认事件，获取拖拽的元素
container.addEventListener('drop', (e) => {
  e.preventDefault()
  const files = e.dataTransfer.files
  let reqList = []
  for (const file of files) {
    const formData = new FormData()
    formData.append('file', file)

    const req = new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/v1/upload/single', {
        method: 'POST',
        data: formData,
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
    })

    reqList.push(req)
  }

  Promise.all(reqList)
    .then((value) => {
      console.log('请求成功', value)
    })
    .catch((e) => {
      console.log('请求失败', e)
    })
})
