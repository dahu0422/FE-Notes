<!-- 文件列表 -->
<template>
  <el-table :data="data">
    <el-table-column
      v-for="col in columnList"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
      v-slot="{ row, $index }"
    >
      <template v-if="col.prop === 'name'"> {{ row.file.name }} </template>
      <template v-else-if="col.prop === 'type'">{{ extname(row.file.name) }}</template>
      <template v-else-if="col.prop === 'size'">{{ fileSize(row.file.size) }}</template>
      <template v-else-if="col.prop === 'status'">
        <el-tag v-if="row.status === 'pending'">待上传</el-tag>
        <el-progress v-else-if="row.status === 'uploading'" :percentage="row.progress" />
        <el-tag v-else :type="row.status">{{ row.status === 'success' ? '成功' : '失败' }}</el-tag>
      </template>
      <template v-if="col.prop === 'operate'">
        <el-icon @click="emits('delete', row, $index)"><Delete /></el-icon>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import { extname, fileSize } from '../utils'

const props = defineProps({
  data: { type: Array, required: true }
})
const emits = defineEmits(['delete'])

const columnList = ref([
  { label: '文件名', prop: 'name' },
  { label: '文件类型', prop: 'type' },
  { label: '大小', prop: 'size' },
  { label: '状态', prop: 'status' },
  { label: '操作', prop: 'operate' }
])
</script>
