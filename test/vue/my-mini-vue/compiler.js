class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        // 处理文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node是否有子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    let attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text ---> text
        attrName = attrName.substring(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key) // call 使 this 指向 Compiler；否则 textUpdater 的 this 为 undefined
  }

  // 处理 v-text 指令
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }

  // 处理 v-model 指令
  modelUpdater(node, value, key) {
    node.value = value

    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // 编译文本节点，处理差值表达式
  compileText(node) {
    // {{ message }}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    // debugger

    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      console.log('---', this.vm[key])
      node.textContent = value.replace(reg, this.vm[key])

      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  // 判断元素属性是否为指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否为文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断节点是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
