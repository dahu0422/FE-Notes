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
