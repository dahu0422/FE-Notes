<script setup>
import FileTable from './components/FileTable.vue'
import DragArea from './components/DragArea.vue'
import { useUpload } from './compositions/useUpload'

const maxSize = 1024 * 1024
const exts = ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png']
const { files, addFiles, deleteFiles, upload } = useUpload([], exts, maxSize)

function handleFileChange(e) {
  addFiles(...e.target.files)
}
</script>

<template>
  <DragArea></DragArea>
  <div class="operate">
    <el-button type="primary">
      文件上传
      <input type="file" @change="handleFileChange" />
    </el-button>
    <el-button type="primary">
      选择文件夹
      <input type="file" webkitdirectory @change="handleFileChange" />
    </el-button>
  </div>
  <FileTable :data="files" @delete="deleteFiles"></FileTable>
  <div class="operate">
    <el-button type="default" @click="upload">开始上传</el-button>
  </div>
</template>

<style scoped>
.operate {
  display: flex;
  margin: 4px 0;
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
}
</style>
