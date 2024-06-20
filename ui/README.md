## 输入元素 Input
[HTML全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

[input输入元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

Input所有类型均有属性：
- disabled：表单控件是否禁用
- form：将表单控件联系到表单元素中
- name：表单的控件名称，作为键值对的一部分与表单一同提交
- type：表单控件的类型
- value：表单控件的初始值
### 单行文本段
- 值：value包含了文本域当前文字的字符串
- 事件：change、input
- 公共属性：
  - maxlength：最大字符数，大于0、大于等于minlength的非负整数；
  - minlength：最小字符数，小于等于maxlength的非负整数；
  - placeholder：简短提示信息，字符串；
  - readonly：只读，布尔值；
  - pattern、list、autocomplete、size、required
#### 表单输入绑定
处理表单时，通常将表单输入框的内容给javascript中定义的变量。
```html
<input :value="text" @input="text = $event.target.value" />

<input v-model="text" />
```
`v-model`根据使用的元素自动使用对应的DOM属性和事件组合。文本类型的`<input>`元素会绑定 `value`property并监听`input`事件。  

`v-model`指令扩展为`modelValue`和`update:modelValue`事件。
```javascript
const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

function handleInput($evt) {
  emit('update:modelValue', $evt.target.value)')
}
```

#### 公共属性
“透传Attributes指的是传递给一个组件，却没有被该组件声明为`props`或`emits`的attributes或者`v-on`事件监听器。”

通过透传Attributes继承公共属性。单根节点的组件会自动attribute透传行为。
```html
<HInputText placeholder="请输入..." maxlength="8"></HInputText>
```
