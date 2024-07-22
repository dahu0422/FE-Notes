// -------- import  --------
// import { name, hello } from './export.js'
// console.log(name, hello())

// import * as exportModule from './export.js'
// console.log(exportModule)

// -------- 接收 export 重命名  --------
// import { exportName as name, exportHello as hello } from './export.js'
// console.log(name, hello())

// -------- 接收 export default 默认导出 --------
// import exportName, { hello } from './export.js'
// console.log(exportName, hello())

// -------- 接收 export default 默认导出误区：不要当成对象结构 --------
// import obj from './export.js'
// console.log(obj.name, obj.hello())

// -------- import 动态导入模块 --------
import('./export.js').then((module) => {
  console.log(module.name, module.hello())
})
