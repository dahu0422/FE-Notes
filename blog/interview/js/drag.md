# drag API
用户选择一个可拖拽的（draggable）元素，拖拽至一个可放置（droppable）的元素，释放鼠标。

## 拖拽事件
- drag：当拖拽元素或文本选中时触发。
- dragstart：在**开始拖动**元素或被选择的文本时调用。
- dragenter：在可拖动的元素或者被选择的文本**进入一个有效的放置目标**时触发。
- dragover：在可拖动的元素或者被选择的文本被拖进一个有效的放置目标时（每隔几百毫秒）触发。
- dragleave：在拖动的元素或选中的文本**离开一个有效的放置目标**时被触发。
- dragend：在拖放操作**结束时触发**。
- drop：在元素或文本选择被放置到有效的放置目标上时触发，为确保 `drop` 事件始终按预期触发，应当在处理 `dragover` 事件的代码部分始终包含 `preventDefault() `调用。

## DataTransfer 对象
用于保存拖动并放下过程中的属性：
- `dataTransfer.dropEffect`：获取当前选定的拖放操作类型或者设置的为一个新的类型。
- `dataTransfer.effectAllowed`：提供所有可用的操作类型。
- `dataTransfer.files`：数据传输中可用的所有本地文件的列表。如果拖动操作不涉及拖动文件，则此属性为空列表。
- `dataTransfer.items`：提供一个包含所有拖动数据列表的`DataTransferItemList`对象。

## 设置元素可拖动
元素全局属性`draggable`用于标识元素是否允许使用浏览器原生行为或 HTML Drag API 拖动。

默认为`auto`，仅图片和链接允许拖动。
```javascript
<div draggable="true"></div>

<img src="xxx" draggable="false">
```

## 示例
### 实现：将元素从一个div拖拽至另一个div中
[基础拖拽源码](https://github.com/dahu0422/FE-Notes/tree/main/web-api/drag/basic)


### 实现：将元素拖拽至网格再拖回
[网格拖拽源码](https://github.com/dahu0422/FE-Notes/tree/main/web-api/drag/grid-drag)