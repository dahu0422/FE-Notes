<!-- 文件列表 -->
<template>
  <el-table :data="currentPageData" class="file-table">
    <el-table-column
      v-for="col in columnList"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
      v-slot="{ row }"
      :show-overflow-tooltip="col.ellipsis"
    >
      <template v-if="col.prop === 'name'">{{ row.file.name }} </template>
      <template v-else-if="col.prop === 'type'">{{ extname(row.file.name) }}</template>
      <template v-else-if="col.prop === 'size'">{{ fileSize(row.file.size) }}</template>
      <template v-else-if="col.prop === 'status'">
        <el-tag v-if="row.status === 'pending'">待上传</el-tag>
        <el-progress v-else-if="row.status === 'uploading'" :percentage="row.progress" />
        <el-tag v-else :type="row.status">{{ row.status === 'success' ? '成功' : '失败' }}</el-tag>
      </template>
      <template v-if="col.prop === 'operate'">
        <el-icon @click="emits('delete', row)"><Delete /></el-icon>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="pagination"
    layout="prev, pager, next"
    page-size="10"
    :currentPage="currentPage"
    :total="data.length"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { extname, fileSize } from '../utils'

const props = defineProps({
  data: { type: Array, required: true }
})
const emits = defineEmits(['delete'])

const columnList = ref([
  { label: '文件名', prop: 'name', ellipsis: true },
  { label: '文件类型', prop: 'type' },
  { label: '大小', prop: 'size' },
  { label: '状态', prop: 'status' },
  { label: '操作', prop: 'operate' }
])

const currentPage = ref(1)
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
}
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * 10
  const end = currentPage.value * 10
  console.log(props.data.slice(start, end))
  return props.data.slice(start, end)
})
</script>

<style scoped>
.pagination {
  margin: 8px 0;
}
.table-cell-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
