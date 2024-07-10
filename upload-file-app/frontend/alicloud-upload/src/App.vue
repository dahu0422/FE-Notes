<script setup>
import { ref } from 'vue'
import FileTable from './components/FileTable.vue'
import { extname } from './utils'

const exts = ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png']
let fileList = ref([]) // 文件列表

function handleFileChange(e) {
  addFiles(...e.target.files)
}

function addFiles(...args) {
  args = args
    .filter((f) => exts.includes(extname(f.name)))
    .map((f) => ({
      file: f,
      status: 'pending',
      progress: 0
    }))
  fileList.value.push(...args)
}

function deletFiles(row, $index) {
  fileList = fileList.value.splice($index, 1)
  if (row.status === 'uploading') {
    row.abort()
  }
}

function handleUpload() {
  for (const f of fileList.value) {
    if (f.status === 'pending') {
      f.status = 'uploading'
      const formData = new FormData()
      formData.append('file', f.file)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'http://localhost:3000/api/v1/upload/single')
      xhr.onload = (e) => {
        f.status = 'success'
      }
      xhr.upload.onprogress = (e) => {
        f.progress = Math.floor((e.loaded / e.total) * 100)
        console.log(f.progress)
      }
      xhr.send(formData)
      f.abort = () => {
        xhr.abort()
      }
    }
  }
}
</script>

<template>
  <el-button type="primary">
    文件上传
    <input type="file" name="file" @change="handleFileChange" />
  </el-button>
  <FileTable :data="fileList" @delete="deletFiles"></FileTable>
  <el-button type="default" @click="handleUpload">开始上传</el-button>
</template>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}

.el-button {
  position: relative;
}

input[type='file'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
