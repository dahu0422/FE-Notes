// 分析过程：鼠标选中某一元素（sourceTarget）将其拖拽进另一div（droptarget）中。
// 实现思路：监听 dropTarget元素的放置事件，在放置时添加sourceTarget。拖拽过程中变更样式，通过监听drag 事件不同触发时机改变。

const sourceTarget = document.querySelector('#draggable')
const dropTarget = document.querySelector('.dropTarget')
let dragNode

// 监听元素拖动开始事件，存储当前拖动元素，变更样式。
sourceTarget.addEventListener('dragstart', (e) => {
  e.target.classList.add('dragging')
  dragNode = e.target
})

// 监听元素 dragend 事件，移除样式。
sourceTarget.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging')
})

// ------- dropTarget事件 -----
// 监听 dragover 事件，阻止元素默认行为，使元素接受drop
dropTarget.addEventListener('dragover', (e) => {
  e.preventDefault()
})

// 监听 dropenter 事件，捕获 sourceTarget 进入 dropTarget时机，变更样式
dropTarget.addEventListener('dragenter', (e) => {
  console.log('进入dropTarget元素', e)
  dropTarget.classList.add('dragover')
})

// 监听 dropLeave 事件，捕获 sourceTarget 离开 dropTarget时机，变更样式
dropTarget.addEventListener('dragleave', (e) => {
  console.log('离开dropTarget元素', e)
  dropTarget.classList.remove('dragover')
})

// 监听 drop 事件，添加元素
dropTarget.addEventListener('drop', (e) => {
  dropTarget.classList.remove('dragover')
  e.target.appendChild(dragNode)
})
