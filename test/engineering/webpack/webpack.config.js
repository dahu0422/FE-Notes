const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist'), // 输出文件路径
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 预设
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
        // webpack5 内置了 asset module；webpack4.x 版本需要配置
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192,
        //     },
        //   },
        // ],
      },
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // webpack-dev-server 会自动读取，最后打包上线的时候开启就行
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'public'), // 从根目录下的 public 文件夹
    //       to: path.resolve(__dirname, 'dist'), // 到 dist 目录
    //     },
    //   ],
    // }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    }, // 静态资源目录
    port: 3000,
    open: true,
    proxy: [
      {
        context: ['/api'],
        // 匹配所有以 /api 开头的请求，http://localhost:3000/api/user => https://api.github.com/api/user
        target: 'https://api.github.com', // 目标域名
        secure: true, // 如果目标是 https 设置为 true
        changeOrigin: true, // 如果目标域名与当前域名不同，设置为 true
        pathRewrite: { '^/api': '' }, // 移除代理前缀，使请求到达目标服务器时没有 /api
      },
    ],
  },
}
