// 1. 支持 ES Modules 的 import 声明
// import './main.css'
// import createHeading from './heading.js'

// document.body.appendChild(createHeading())
// const img = document.createElement('img')
// img.src = icon
// document.body.appendChild(img)

//--------------------
import './main.css'
import footerHtml from './footer.html'

document.body.innerHTML += footerHtml
