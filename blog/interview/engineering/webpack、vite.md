# Webpack

webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。

主要功能是将各种类型的资源（包括单不限于 JavaScript、CSS、图片等）转译、组合生成一个或多个静态资源文件，如`.js`格式的 bundle 文件。

当处理应用程序时，webpack 会构建一个依赖图（dependency graph），该图表示项目中每个模块之间的依赖关系。基于这个图，Webpack 将项目中所需的每个模块组合成一个或多个 bundles。

这些 bundles 是静态资源文件，可以直接在浏览器中执行或加载。

## 核心概念

- entry：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
- output：告诉 webpack 在哪里输出它创建的 bundle，以及如何命名这些文件。
- loader：webpack 只能理解 JS 和 JSON 文件，loader 让 webpack 能够处理其他类型的文件，并将它们转换为有效模块。前一个 loader 的输出是后一个 loader 的输入。
- plugin：让开发者对 webpack 的构建过程进行更细粒度的控制。可以在构建的生命周期中的特定时间点被触发，并执行。比如打包优化、资源管理、注入环境变量等。

##

# Vite
