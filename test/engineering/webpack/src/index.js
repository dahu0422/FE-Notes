// ------------ 体验 webpack 打包 ------------
// import './main.css'
// import createHeading from './heading.js'

// document.body.appendChild(createHeading())
// const img = document.createElement('img')
// img.src = icon
// document.body.appendChild(img)

//--------- HTMLWebpackPlugin 插件 -----------
import './style/main.css'
import footerHtml from './html/footer.html'
import background from './assets/better.png'

const img = new Image()
img.src = background
document.body.appendChild(img)

document.body.innerHTML += footerHtml

// --------- HMR 热替换 ------------
// import './style/main.css'
// import createEditor from './js/editor.js'
// import background from './assets/better.png'

// createEditor()

// const img = new Image()
// img.src = background
// document.body.appendChild(img)
