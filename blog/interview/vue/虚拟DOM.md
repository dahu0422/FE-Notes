# 虚拟 DOM

虚拟 DOM 是将目标元素通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。

```js
const vnode = {
  type: 'div',
  props: { id: 'hello' },
  children: [ ... ]
}
```

这个 `vnode` 是一个纯 Javascript 的对象，代表一个 `<div>` 元素。包含了创建实际元素所需要的所有信息，以及子节点。

## 渲染管线

Vue 组件挂载要经过：编译、挂载、更新

![render-pipeline](https://cn.vuejs.org/assets/render-pipeline.CwxnH_lZ.png)

### 编译

在 Vue3 中， `complier-core` 负责核心编译相关能力，包括解析模板(parse)、转化 AST 抽象语法树(transform)、生成渲染函数(generate)三个过程。

`compiler-core` [部分源码](https://github.com/vuejs/core/blob/main/packages/compiler-core/src/compile.ts#L65)

```js
export function baseCompile(
  source: string | RootNode,
  options: CompilerOptions = {}
): CodegenResult {
  ...
  const ast = isString(source) ? baseParse(source, resolvedOptions) : source;
  ...
  transform(
    ast,
    extend({}, resolvedOptions, {
      nodeTransforms: [
        ...nodeTransforms,
        ...(options.nodeTransforms || []), // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {} // user transforms
      ),
    })
  );

  return generate(ast, resolvedOptions);
}
```

#### 解析模板，生成 AST --- baseParse

当组件实例初始化时，会将模板传入 Vue 编译器进行编译。在这个过程中会将模板字符解析成一个**抽象语法树（Abstract Syntax Tree）**。

Vue 引用了 `htmlparser2` 的第三方库来解析模板，在源码中被定义为 `Tokenizer`。它将模板中的**指令**和**属性**转换为对应的 AST 节点。

以下面这段代码为例

```html
<div>
  <h1>{{ message }}</h1>
  <button @click="updateMessage">Update Message</button>
</div>
```

编译器会生成一个类型这样的 AST 结构

```js
{
  type: 'root',
  children: [
    {
      type: 'element',
      tag: 'div',
      children: [
        {
          type: 'element',
          tag: 'h1',
          children: [
            {
              type: 'text',
              content: '{{ message }}'
            }
          ]
        },
        {
          type: 'element',
          tag: 'button',
          children: [
            {
              type: 'text',
              content: 'Update Message'
            }
          ],
          events: {
            click: 'updateMessage'
          }
        }
      ]
    }
  ]
}
```

#### 转化 AST --- transform

在生成 AST 后 会调用 `transform` 函数，对 AST 进行优化。这一阶段包括静态节点的识别、表达式的缓存等等，目的是为了减少运行时的计算量，提高渲染性能。

<!-- TODO:后续补充 -->

#### 生成渲染函数 --- generate

在编译结束后，上面那段模板表达式被转为一个 `render` 函数。你可以在尝试 [Vue3 Template Explorer](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxuICA8aDE+e3sgbWVzc2FnZSB9fTwvaDE+XG4gIDxidXR0b24gQGNsaWNrPVwidXBkYXRlTWVzc2FnZVwiPlVwZGF0ZSBNZXNzYWdlPC9idXR0b24+XG48L2Rpdj4iLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlfX0=) 转化一段模板表达式：

```js
const _hoisted_1 = ["onClick"];

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock("div", null, [
      _createElementVNode(
        "h1",
        null,
        _toDisplayString(_ctx.message),
        1 /* TEXT */
      ),
      _createElementVNode(
        "button",
        { onClick: _ctx.updateMessage },
        "Update Message",
        8 /* PROPS */,
        _hoisted_1
      ),
    ])
  );
}

// Check the console for the AST
```

最终生成的渲染函数会被存储在组件实例的 `_render` 方法中，当组件被挂载或者需要更新时，Vue 会调用 `_render` 方法生成虚拟 DOM 树。

### 挂载

在组件挂载阶段，Vue 会调用 `render` 函数，生成虚拟 DOM 树，并基于它创建真实 DOM 树。

#### 创建 vnode

![createVNode](../../public/vue/createVNode.png)

`_createVNode` 函数是创建虚拟 DOM 节点的核心方法，处理了多种类型的组件和属性，确保 VNode 正确构建。主要做了以下事情：

### 首次调用

![createApp_mount](../../public/vue/createApp_mount.png)

首次挂载时调用 `createVNode` 函数，传入跟组件，创建虚拟 DOM 节点，调用 `render` 函数。

![render](../../public/vue/render.png)

`render` 函数中如果传入 `vnode` 进入 `patch` 调用，`patch` 将虚拟 DOM 转化为真实 DOM。

![patch](../../public/vue/patch.png)

`patch` 方法会根据不同 `type` 类型进行相应处理，在初始化渲染根节点时进入`processComponent` 方法。最终会调用 `setupRenderEffect` 方法，将 `render` 函数返回的 `vnode` 渲染成真实 DOM。`

### 更新

当一个依赖发生变化后，副作用会重新运行，这是会创建一个更新后的虚拟 DOM 树。运行时渲染器遍历这颗新树，将它与旧树比较，然后将必要的更新应用到真实 DOM 树上。

## 带编译时信息的虚拟 DOM
