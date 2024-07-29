# webpack

## 快速上手 webpack
准备一个文件
```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

文件目录
```
webpack-demo
|- package.json
|- package-lock.json
|- index.html
|- /src
  |- index.js
  |- heading.js
```

运行命令
```bash
npx webpack
```

Webpack会尝试读取项目中的Webpack**配置文件**（默认为webpack.config.js），并根据配置文件中的设置来执行打包操作。如果没有找到配置文件，Webpack会尝试使用其**内置的默认配置**（默认读取 ./src/index.js 文件）。

执行结果：

<img src="./assets/npx webpack 执行结果.png" />

执行结果含义：
- `asset main.js 195 bytes [emitted] [minimized] (name: main)`：表示构建了一个名为 main.js 的输出文件，大小为 195 字节。`emiitted` 表示已经输出到目标目录。`minimized` 表示该文件经过了压缩。
- `orphan modules 206 bytes [orphan] 1 module`：表示有 1 个孤儿模块（没有被任何输出文件所引用），大小为 206 字节。
- `./src/index.js + 1 modules 291 bytes [built] [code generated]`：表示 inedx.js 和 另一个模块被一起构建了，大小为 291 字节。`built` 表示已经编译过了。`code generated` 表示已经生成了代码。

## 配置文件 webpack.config.js
webpack v4 以后的版本无须任何配置即可运行，然而大多数项目会需要很复杂的设置，因此 webpack 仍然支持 配置文件，这比在终端中手动输入大量命令更加高效。接下来创建一个 webpack 配置文件：

```js
const path = require('path')

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist'), // 输出文件路径
  },
}
```

## 打包模式
在上一节运行 `npx webpack` 命令，控制台有一个警告。

<img src="./assets/未配置 mode 终端提示.png" >

意思是 `mode` 配置项没有被设置，默认为 `production`。建议设置为 `development` 或者 `production`。也可以设置 `none`，表示不使用任何默认配置。

下面分别介绍一下这三种模式

### 开发模式 development
使用 `npx webpack --mode development` 或者在 `webpack.config.js` 中配置 `mode: 'development'`。

这种模式主要用于开发环境，启动一些有助于开发的功能，例如增强的错误堆栈、模块热替换（Hot Module Replacement）等。

开发模式下，webpack不会对代码进行压缩，以便于调试。

执行结果：

<img src="./assets/npx webpack --mode developmen 执行结果.png" />

执行结果含义：
- `asset bundle.js 4.39 KiB [emitted] (name: main)`：***注意 !!*** 这里就没有 `[minimized]` 了，因为开发模式不会对代码进行压缩，所以 bundle.js 文件也要比之前大很多。
- `runtime modules 670 bytes 3 modules`：这行说明Webpack在打包过程中生成了3个运行时模块（runtime modules），这些模块的总大小为670字节。
- `cacheable modules 291 bytes`：表示Webpack在处理过程中遇到了291字节的可缓存模块。这通常指的是源代码文件，Webpack会尝试缓存这些文件的处理结果，以便在下次构建时加快构建速度。

### 生产模式 production
使用 `npx webpack --mode production` 或者在 `webpack.config.js` 中配置 `mode: 'production'`。

生产模式是为部署到生产环境设计的，它会启用一系列的优化措施，如代码压缩、模块标识的混淆、Tree Shaking 等，以减少最终输出文件的大小，提高加载速度和性能。

此模式下，Webpack 还会移除所有的开发环境的警告和调试信息，只保留必要的运行时代码。

### 无模式 none
使用 `npx webpack --mode none` 或者在 `webpack.config.js` 中配置 `mode: 'none'`。

当你在 Webpack 配置中不指定模式时，默认情况下 Webpack 不会应用任何预设的优化。

这种情况下，Webpack 的行为是最基础的，不会进行特别的代码分割、压缩或其他针对生产或开发环境的优化。


> 实际项目中，通常会结合使用不同配置文件来区分开发和生产环境，例如 `webpack.dev.js` 和 `webpack.prod.js`


## loader 
Webpack 的 loader 是一个用于处理各种**不同类型文件**的转换器。loader 可以将任何类型的文件转换为 webpack 能够处理的有**效模块**，然后你就可以像处理其他模块一样使用它们。

### 样式资源加载 css-loader 与 style-loader
要想在 JavaScript 模块中导入 CSS 文件，需要安装 `style-loader` 和 `css-loader`，并在 module 配置 中添加这些 loader：
```js
...
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配css文件
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```
module loader 可以**链式调用**。链中的每个 loader 都将对资源进行转换，不过链会**逆序执行**（从后向前执行）。第一个 loader 将其结果（被转换后的资源）传递给下一个 loader，依此类推。最后，webpack 期望链中的最后的 loader 返回 JavaScript。

webpack loader解析是从后向前执行的，所以要确保 `style-loader` 在 `css-loader` 前面。因为 `css-loader` 负责解析 CSS 文件，转化为相应的的模块引用。`style-loader` 负责将 CSS 模块插入到 DOM 中。

执行结果如图：

<img src="./assets/加载样式文件.png" />

--- 
> rules 数组中的对象的属性：
> 
> test：匹配要处理的文件，是一个正则表达式
> 
> use：一个数组或者字符串，包含要使用的 loader，loader 的执行顺序是从右到左的。

### 文件资源加载 file-loader 与 url-loader
在 **webpack5 之前**通常使用 `file-loader` 和 `url-loader` 都能用于处理文件资源。

`file-loader` 会将文件复制到输出目录，并返回文件路径。这对较大文件来说非常有用，因为它们不会被嵌入到构建产物中，而是作为独立的文件存在

`url-loader` 会将文件转换为 base64 编码的字符串，并返回 base64 编码的字符串。对较小的文件（小于 limit 属性值）很有用，因为它们可以减少 HTTP 请求的数量，从而提高性能。

更新配置项
```js
module.exports = {
  module: {
    rules: [
      ...,
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB以下的文件将被转换为Data URL
            },
          },
        ],
      },
    ]
  }
}
```

实际操作过程中遇到了一个问题，通过 css 样式设置的背景图打包之后生成了两张，其中一张损坏并且页面无法正常显示。

```css
body {
  min-height: 100vh;
  background: #f4f8fb;
  background-image: url(background.png);
  background-size: cover;
}
```

终端提示：

<img src="./assets/重复打包同一张背景图.png" />

原因：[https://blog.csdn.net/Coralpapy/article/details/119419137](https://blog.csdn.net/Coralpapy/article/details/119419137)

根据上边这篇博客，我在[官方文档](https://www.webpackjs.com/guides/asset-modules#root)中发现，webpack5 内置了 `asset module`，允许使用资源文件，无需配置额外loader。

<img src="./assets/webpack5 asset module.png" width="60%" />

删除 `file-loader` 和 `url-loader` 的配置项后就可以正常运行了

```js
module.exports = {
  module: {
    rules: [
      ...,
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        // webpack5 内置了 asset module；webpack4.x 版本需要配置
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192, // 8KB以下的文件将被转换为Data URL
        //     },
        //   },
        // ],
      },
    ]
  }
}
```

### ES6 -> ES5 babel-loader
webpack 不会自动编译 ES6 代码，需要使用 `babel-loader` 来转换。

打包输出文件 bundle.js 部分截图
<img src="./assets/webpack 不会编译es6语法.png">

如上图所示，`const`、箭头函数等语法并没有转化为 ES5的写法。

安装相关依赖
```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

更新配置文件
```js
...
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 预设
          },
        },
      },
    ],
  },
}
```

- `babel-loader`：读取每个 .js 文件，并调用 `@babel/core` 来进行编译，将 ES6 语法编译为 ES5 语法。
- `@babel/core`：Babel 的核心库，负责编译 ES6 语法。
- `@babel/preset-env`：Babel 的预设，包含了所有 ES6 语法的编译规则。它基于目标浏览器的支持情况，智能地选择哪些插件（plugins）需要被激活，以转换那些不被目标环境支持的语法。确保你的代码只转换为确实需要的部分，避免不必要的转换，这有助于保持代码的简洁性和性能。

重新打包编译生成 bundle.js 文件，截图如下：

<img src="./assets/babel-loader 转换.png" />

可以看到，`const`、箭头函数等语法已经转化为 ES5的写法。

### html-loader
将 HTML 导出为字符串。当编译器需要时，将压缩 HTML 字符串。

更新 `webpack-config.js` 配置文件
```js
...
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
}
```
新增文件 `footer.html`

```html
<footer>
  <img src="better.png" alt="better" width="256">
  <a href="better.png">download png</a>
</footer>
```

打包编译后，img 标签可以正常显示，a 标签访问提示 404。根据官方文档 html-loader 的 [source](https://www.webpackjs.com/loaders/html-loader/#sources) 配置项描述，a 标签 href 属性默认是不自动处理的，要手动添加。

更新 `webpack-config.js` 配置文件

```js
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /.html$/,
        use: {
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                { tag: 'img', attribute: 'src', type: 'src' },
                { tag: 'a', attribute: 'href', type: 'src' },
              ],
            },
          },
        },
      },
    ],
  },
}
```


## Plugin

### clean-webpack-plugin 
`clean-webpack-plugin` 的主要作用是在每次构建开始前清理输出目录，确保没有旧的构建文件残留，这对于避免文件冲突和确保构建的一致性非常重要。

安装依赖 `npm install --save-dev clean-webpack-plugin`

更新 `webpack-config.js` 配置文件

```js
...
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  ...
  plugins: [new CleanWebpackPlugin()],
}
```

重新执行 `npx webpack --mode none` 原先 dist 目录下的文件已经被删除，生成了新的文件。

### html-webpack-plugin
`html-webpack-plugin` 是一个用于 HTML 文件的插件，它允许你使用简单的模板语法，生成带有自动插入的 webpack 构建文件的 HTML 文件。

安装依赖 `npm install --save-dev html-webpack-plugin`

更新 `webpack-config.js` 配置文件

```js
...
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 模板文件
    }),
  ],
}
```

重新执行 `npx webpack --mode none`，终端提示 index.html 文件生成成功。

<img src="./assets/html-webpack-plugin 打包结果.png" />

### copy-webpack-plugin
`copy-webpack-plugin` 是一个用于复制文件到输出目录的插件。

安装依赖 `npm install --save-dev copy-webpack-plugin`

更新 `webpack-config.js` 配置文件

```js
...
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  ...
  module: {
  plugins: [
    ...
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'), // 从根目录下的 public 文件夹
          to: path.resolve(__dirname, 'dist'), // 到 dist 目录
        },
      ],
    }),
  ],
}

```

