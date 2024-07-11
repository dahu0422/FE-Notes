import { reactive, computed } from 'vue'
import { extname } from '@/utils'
import { uploadFile } from '@/api/upload'

export function useUpload(initFiles = [], exts, maxSize) {
  const files = reactive(initFiles)

  /**
   * 处理文件内容，添加进度、状态属性
   * @param {file} file 文件
   * @returns 格式化后文件
   */
  const createNewFile = (file) => ({
    file,
    progress: 0,
    status: 'pending'
  })

  /**
   * 添加待上传文件
   * @param  {...any} args
   */
  const addFiles = (...args) => {
    args = args.filter((f) => exts.includes(extname(f.name)) && f.size <= maxSize)
    files.push(...args.map(createNewFile))
  }

  const deleteFiles = (...args) => {
    for (const f of args) {
      const i = files.indexOf(f)
      files.splice(i, 1)
      if (f.status === 'uploading') {
        f.abort()
      }
    }
  }

  const pendingFiles = computed(() => files.filter((x) => x.status === 'pending'))
  const upload = () => {
    pendingFiles.value.forEach((f) => {
      f.status = 'uploading'
      f.abort = uploadFile(
        f.file,
        (p) => {
          f.progress = p
        },
        (resp) => {
          f.status = 'success'
          f.resp = resp
        }
      )
    })
  }

  return {
    files,
    pendingFiles,
    addFiles,
    deleteFiles,
    upload
  }
}
