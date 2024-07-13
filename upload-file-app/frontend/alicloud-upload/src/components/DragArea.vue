<script setup>
import { computed, ref } from 'vue'
import { fileSize } from '../utils/index'

const props = defineProps({
  supports: {
    type: Array,
    default: () => ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png']
  },
  maxSize: { type: Number, default: 1024 * 1024 }
})

const supports = computed(() => props.supports.join('、'))
const maxSize = computed(() => fileSize(props.maxSize))
const isDraging = ref(false)

// 监听拖拽进入事件，判断拖拽内容是否为文件；阻止默认事件，添加样式
function dragInHandler(e) {
  if (!e.dataTransfer.types.includes('Files')) {
    return
  }
  e.preventDefault()
  isDraging.value = true
}

function dropHandler(e) {
  e.preventDefault()
  isDraging.value = false

  let results = []
  // TODO:递归读取文件、文件夹
}

function dragleave(e) {
  e.preventDefault()
  isDraging.value = false
}
</script>

<template>
  <div
    class="drag-area"
    :class="{
      draging: isDraging
    }"
    @dragenter="dragInHandler"
    @dragover="dragInHandler"
    @dragleave="dragleave"
    @drop="dropHandler"
  >
    <p class="section">
      <i class="iconfont i-shangchuan"></i>
      <span>将目录或多个文件拖拽到此进行扫描</span>
    </p>
    <p class="section">支持的文件类型：{{ supports }}</p>
    <p>每个文件允许的最大尺寸：{{ maxSize }}</p>
  </div>
</template>

<style scoped>
.drag-area {
  width: 100%;
  line-height: 30px;
  color: #888;
  border: 1px dashed #dedede;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
}
.draging {
  border-color: #2565c1;
  background: #eee;
}
.section {
  display: flex;
  justify-content: center;
  column-gap: 1em;
  align-items: center;
}
.i-shangchuan {
  font-size: 3em;
}
</style>
