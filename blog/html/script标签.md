# script 标签
`<script>` 标签用于嵌入可执行代码或数据。

### async
async 属性使脚本**异步加载**，脚本可以并行下载，一旦下载完成即可执行。包括在 `DOMCOntentedLoaded` 事件前后，可能导致脚本执行的**顺序**与他们在 HTML 文档中的位置**不一致**。

### defer
defer 属性也是使脚本**异步加载**，但是保证脚本会在文档解析完成后按他们在文档中的**顺序执行**。所有带有 defer 属性的脚本都会在 `DOMContentLoaded` 事件触发**之前**执行。


> DOMContentLoaded 事件在**DOM树**和**样式表**被完全加载和解析完成时触发，**不包括**所有外部资源，如 `img` 和 `script`。比 `loaded` 事件更早触发。
