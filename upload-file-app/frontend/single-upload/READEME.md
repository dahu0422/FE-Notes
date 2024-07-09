## dom结构设计
主要分为三部分：
  1. 上传元素 `upload-select`
  2. 进度元素 `upload-progress`
  3. 上传结果 `upload-result`
在不同操作阶段，通过外层元素`upload xxx`控制元素的显示。

## 逻辑设计
1. 声明`showArea()`方法用于切换文件
2. 监听`input[type=file]`元素的文件上传，通过`FileReader`读取文件内容，生成预览图。
3. 声明`upload()`方法用于向服务器发起请求，通过`xhr.upload.onprogress`记录上传进度。


