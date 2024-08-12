const container = document.querySelector('.container')
let source
// 利用事件委托，给父级元素绑定事件从而传递事件，触发时传递给子元素。
container.addEventListener('dragstart', (e) => {
  source = e.target
  e.dataTransfer.effectAllowed = e.target.dataset.effect
})

// 监听dragover事件阻止默认事件
container.addEventListener('dragover', (e) => {
  e.preventDefault()
})

function clearDragOverStyle() {
  document.querySelectorAll('.dragover').forEach((node) => {
    node.classList.remove('dragover')
  })
}

/**
 * 递归查询元素 及 父元素 是否接收放置
 * @param {node} node 元素
 */
function getDropNode(node) {
  while (node) {
    if (node.dataset && node.dataset.drop) {
      return node
    }
    node = node.parentNode
  }
}

// 监听 dragenter 事件，source元素进入时变更样式。
container.addEventListener('dragenter', (e) => {
  clearDragOverStyle()
  const dropNode = getDropNode(e.target)
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    dropNode.classList.add('dragover')
  }
})

// 监听 drop 事件，变更样式
container.addEventListener('drop', (e) => {
  clearDragOverStyle()
  const dropNode = getDropNode(e.target)
  if (dropNode.dataset.drop === source.dataset.effect) {
    if (dropNode.dataset.drop === 'copy') {
      dropNode.innerHTML = ''
      const cloneNode = source.cloneNode(true)
      cloneNode.dataset.effect = 'move'
      dropNode.appendChild(cloneNode)
    } else {
      source.remove()
    }
  }
})
