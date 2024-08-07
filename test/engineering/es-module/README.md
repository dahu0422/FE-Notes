# 模块化

模块化是一种软件设计和开发策略，核心思想是将一个大的系统分解成较小的、独立的、可复用的部分，这些部分称为模块。好处是分离关注点，降低耦合度，提高开发效率。

模块化的体现：

1. 文件和目录结构：将相关的代码放置在同一个文件或目录下，形成逻辑上的模块；
2. 代码封装：使用类、函数、对象等将功能封装起来，对外提供接口；
3. 依赖管理：使用构建工具来管理模块间的依赖关系；
4. 接口定义：清晰定义模块的输入输出，保证模块之间的交互是通过接口而非内部实现；

## 历史发展

早期每个功能和相关数据放在一个单独的文件中，约定每个文件就是一个单独的模块，使用时引入到页面中。问题：

1. 所有模块都在全局变量中，没有私有空间，模块内部的变量、函数都可以被外部随意更改；
2. 模块之间变量会存在命名冲突；

AMD 和 **CommonJS**：AMD（Async Module Definition）主要用于浏览器环境支持异步加载模块；CommonJS 用于服务器端（NodeJS）同步加载。

ES Module 是 ES6 引入的新特性，用于模块化开发，通过 import 和 export 关键字来导入导出模块。

## ES Modules 特性

- 自动采用**严格模式**，即使未显示声明'use strict';
- 每个 ESM 模块都是单独的私有作用域；
- ESM 通过 CORS 请求外部 JS 模块；
- ESM 的 script 标签会延迟执行脚本

## ES Module 导入导出

### 依次导出声明变量

```js
// export.js
export const name = 'ES Module'
export const say = () => `name is `${name}`

// import.js
import { name, say } from './export.js'
console.log(name, say())
```

### 合并导出声明变量

```js
// export.js
const name = 'ES Module'
const say = () => `name is `${name}`
export { name, say }

// import.js
import { name, say } from './export.js'
console.log(name, say())
```

### 导入、导出重命名

```js
// export.js
const name = 'ES Module'
const say = () => `name is `${name}` 
export { name as exportName, say as exportSay }

// import.js
import { exportName as name, exportSay as say } from './export.js'
console.log(name, say())
```

默认导出 export default，一个模块中只能有一个默认导出。

```js
// export.js
const name = 'ES Module'
export const say = () => `name is `${name}`
export default name

// import.js
import name, { say } from './export.js'
console.log(name, say())
```

不要把 `export default {}` 和 `import {}` 当成对象解构

```js
// export.js
const name = 'ES Module'
export const say = () => `name is `${name}`
export default { name, say } // 导出对象

// import.js
// import { name, say } from './export.js' ❌
import * as obj from './export.js' 
console.log(obj.name, obj.say())
```

## CommonJS vs ES Module

**语法层面**： CommonJS 使用 `require()`函数导入模块，`module.exports` 或 `exports`导出模块。ES Module 使用 `import` 和 `export` 导入导出模块。

```js
// CommonJS
const ... = require('./module') // 导入模块
module.exports = {...} // 导出模块

// ES Module
import { ... } from './module' // 导入模块
export const ... = ...
```

**加载机制**：CommonJS 同步加载。ES Module **静态加载**，在加载时只解析其导入导出声明，在运行时才执行。ESM支持运行时加载模块，使用 import() 函数动态导入模块。

**值的传递**：CommonJS 导出的是拷贝过后的值，如果模块内部对导出值修改是不会影响到外部引用的值。ES Module 导出的是**引用**，如果模块内部对导出值修改会影响到外部引用的值。

**支持环境**：CommonJS 运行在 Node.js 环境。ES Module 运行在**浏览器环境和较新版本的 Node.js**。

- 在浏览器中给 `<script>` 标签中设置 `type="module"` 属性；
- 在 Node.js 中，文件扩展名 `.mjs` 或 在 package.json 中设置 `"type": "module"` 启用。
