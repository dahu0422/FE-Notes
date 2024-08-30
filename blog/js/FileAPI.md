# File API

我们知道，_HTML_ 的 _input_ 表单控件，其 _type_ 属性可以设置为 _file_，表示这是一个上传控件。

```html
<input type="file" name="" id="" />
```

选择文件前：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-02-022039.png" alt="image-20211202102038796" style="zoom:50%;" />

选择文件后：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-02-022057.png" alt="image-20211202102056757" style="zoom:50%;" />

这种做法用户体验非常的差，我们无法**在客户端**对用户选取的文件进行 _validate_，无法读取文件大小，无法判断文件类型，无法预览。

如果是多文件上传，_JavaScript_ 更是回天乏力。

```html
<input type="file" name="" id="" multiple />
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-02-022115.png" alt="image-20211202102115626" style="zoom:50%;" />

但现在有了 _HTML5_ 提供的 _File API_，一切都不同了。该接口允许 _JavaScript_ 读取本地文件，但并不能直接访问本地文件，而是要依赖于用户行为，比如用户在 _type='file'_ 控件上选择了某个文件或者用户将文件拖拽到浏览器上。

_File Api_ 提供了以下几个接口来访问本地文件系统：

- _File_：单个文件，提供了诸如 _name、file size、mimetype_ 等只读文件属性

- _FileList_：一个类数组 _File_ 对象集合

- _FileReader_：异步读取文件的接口

- _Blob_：文件对象的二进制原始数据

## _File_ 对象

_File_ 对象代表一个文件，用来读写文件信息。它继承了 _Blob_ 对象，或者说是一种特殊的 _Blob_ 对象，所有可以使用 _Blob_ 对象的场合都可以使用它。

最常见的使用场合是表单的文件上传控件（\<_input type="file"_>），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 _File_ 实例对象。

```html
<input type="file" name="" id="file" />
```

```js
// 获取 DOM 元素
var file = document.getElementById("file");
file.onchange = function (event) {
  var files = event.target.files;
  console.log(files);
  console.log(files[0] instanceof File);
};
```

上面代码中，_files[0]_ 是用户选中的第一个文件，它是 _File_ 的实例。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-02-022135.png" alt="image-20211202102135071" style="zoom:50%;" />

### 构造函数

浏览器原生提供一个 _File( )_ 构造函数，用来生成 _File_ 实例对象。

```js
new File(array, name [, options])
```

_File( )_ 构造函数接受三个参数。

- _array_：一个数组，成员可以是二进制对象或字符串，表示文件的内容。

- _name_：字符串，表示文件名或文件路径。

- _options_：配置对象，设置实例的属性。该参数可选。

第三个参数配置对象，可以设置两个属性。

- _type_：字符串，表示实例对象的 _MIME_ 类型，默认值为空字符串。

- _lastModified_：时间戳，表示上次修改的时间，默认为 _Date.now( )_。

下面是一个例子。

```js
var file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
```

### 实例属性和实例方法

_File_ 对象有以下实例属性。

- _File.lastModified_：最后修改时间

- _File.name_：文件名或文件路径

- _File.size_：文件大小（单位字节）

- _File.type_：文件的 _MIME_ 类型

```js
var file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
console.log(file.lastModified); // 1638340865992
console.log(file.name); // foo.txt
console.log(file.size); // 3
console.log(file.type); // text/plain
```

在上面的代码中，我们创建了一个 _File_ 文件对象实例，并打印出了该文件对象的诸如 _lastModified、name、size、type_ 等属性信息。

_File_ 对象没有自己的实例方法，由于继承了 _Blob_ 对象，因此可以使用 _Blob_ 的实例方法 _slice( )_。

## _FileList_ 对象

_FileList_ 对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 _File_ 实例。

在最上面的那个示例中，我们就可以看到触发 _change_ 事件后，_event.target.files_ 拿到的就是一个 _FileList_ 实例对象。

它主要出现在两个场合。

- 文件控件节点（\<_input type="file"_>）的 _files_ 属性，返回一个 _FileList_ 实例。

- 拖拉一组文件时，目标区的 _DataTransfer.files_ 属性，返回一个 _FileList_ 实例。

```html
<body>
  <input type="file" name="" id="file" />
  <script>
    // 获取 DOM 元素
    var file = document.getElementById("file");
    file.onchange = function (event) {
      var files = event.target.files;
      console.log(files);
      console.log(files instanceof FileList);
    };
  </script>
</body>
```

上面代码中，文件控件的 _files_ 属性是一个 _FileList_ 实例。

_FileList_ 的实例属性主要是 _length_，表示包含多少个文件。

_FileList_ 的实例方法主要是 _item( )_，用来返回指定位置的实例。它接受一个整数作为参数，表示位置的序号（从零开始）。

但是，由于 _FileList_ 的实例是一个类似数组的对象，可以直接用方括号运算符，即 _myFileList[0]_ 等同于 _myFileList.item(0)_，所以一般用不到 _item( )_ 方法。

## _FileReader_ 对象

_FileReader_ 对象用于读取 _File_ 对象或 _Blob_ 对象所包含的文件内容。

浏览器原生提供一个 _FileReader_ 构造函数，用来生成 _FileReader_ 实例。

```js
var reader = new FileReader();
```

_FileReader_ 有以下的实例属性。

- _FileReader.error_：读取文件时产生的错误对象

- _FileReader.readyState_：整数，表示读取文件时的当前状态。一共有三种可能的状态，_0_ 表示尚未加载任何数据，_1_ 表示数据正在加载，_2_ 表示加载完成。

- _FileReader.result_：读取完成后的文件内容，有可能是字符串，也可能是一个 _ArrayBuffer_ 实例。

- _FileReader.onabort_：_abort_ 事件（用户终止读取操作）的监听函数。

- _FileReader.onerror_：_error_ 事件（读取错误）的监听函数。

- _FileReader.onload_：_load_ 事件（读取操作完成）的监听函数，通常在这个函数里面使用 _result_ 属性，拿到文件内容。

- _FileReader.onloadstart_：_loadstart_ 事件（读取操作开始）的监听函数。

- _FileReader.onloadend_：_loadend_ 事件（读取操作结束）的监听函数。

- _FileReader.onprogress_：_progress_ 事件（读取操作进行中）的监听函数。

下面是监听 _load_ 事件的一个例子。

```html
<body>
  <input type="file" name="" id="file" />
  <script>
    // 获取 DOM 元素
    var file = document.getElementById("file");
    file.onchange = function (event) {
      var file = event.target.files[0]; // 拿到第一个文件
      var reader = new FileReader(); // 创建一个 FileReader 实例对象
      // 读取文件成功后触发 load 事件
      reader.onload = function (event) {
        console.log(event.target.result);
      };
      // 读取文件
      reader.readAsText(file);
    };
  </script>
</body>
```

上面代码中，每当文件控件发生变化，就尝试读取第一个文件。如果读取成功（ _load_ 事件发生），就打印出文件内容。

_FileReader_ 有以下实例方法。

- _FileReader.abort( )_：终止读取操作，_readyState_ 属性将变成 _2_。

- _FileReader.readAsArrayBuffer( )_：以 _ArrayBuffer_ 的格式读取文件，读取完成后 _result_ 属性将返回一个 _ArrayBuffer_ 实例。

- _FileReader.readAsBinaryString( )_：读取完成后，_result_ 属性将返回原始的二进制字符串。

- _FileReader.readAsDataURL( )_：读取完成后，_result_ 属性将返回一个 _Data URL_ 格式（ _Base64_ 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于 \<_img_> 元素的 _src_ 属性。注意，这个字符串不能直接进行 _Base64_ 解码，必须把前缀 `data:*/*;base64,` 从字符串里删除以后，再进行解码。

- _FileReader.readAsText( )_：读取完成后，_result_ 属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 _Blob_ 实例，第二个参数是可选的，表示文本编码，默认为 _UTF-8_。

下面是一个读取图片文件的例子。

```html
<input type="file" name="" id="file" /> <img src="" alt="" width="200" />
```

```js
// 获取 DOM 元素
var file = document.getElementById("file");
file.onchange = function () {
  var preview = document.querySelector("img");
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
};
```

上面代码中，用户选中图片文件以后，脚本会自动读取文件内容，然后作为一个 _Data URL_ 赋值给 \<_img_> 元素的 _src_ 属性，从而把图片展示出来。

## Blob 构造函数

```javascript
/**
 * @desc 创建Blob对象
 * @param {Array<Blob | BufferSource | string>} blobParts 一个可迭代的对象
 * @param {object} options 配置项
 * @param {string} options.type 媒体类型，默认值：""
 * @param {number} options.endings 指定文本编码方式，默认值：`transparent
 * @returns {Blob} 一个包含指定数据的Blob对象
 */
new Blob(blobParts, options);

// 示例
const blobParts = ['<q id="a"><span id="b">hey!</span></q>']; // 一个包含单个字符串的数组
const blob = new Blob(blobParts, { type: "text/html" }); // 得到 blob
```

运行示例：
<img src='../../public/blob实例.png' />

从图中可以看到有两个实例属性和四个实例方法：

- `Blob.size`(只读)：，表示 Blob 对象的大小，单位为字节。
- `Blob.type`：表示该`Blob`对象所包含的 MIME 类型。
- `Blob.slice()`：返回一个新的 Blob 对象，其内容由 Blob 对象从 start 到 end 指定的字节序列。
- `Blob.stream()`：返回一个`ReadableStream`对象，该对象包含 Blob 对象中的字节序列。
- `Blob.arrayBuffer()`：返回一个 Promise 对象，该 Promise 对象在 Blob 对象中的字节序列被读取后，会兑现一个包含该字节序列的 ArrayBuffer 对象。`
- `Blob.text()`

## Blob 使用场景

1.文件下载：通过`window.URL.createObjectURL()`方法，将 Blob 对象转换为 URL，然后通过`<a>`标签下载。

```javascript
/**
 * @desc 文件下载
 * @param {string} url 下载地址
 * @param {string} fileName 下载文件名
 * @returns {void}
 */
async function downloadFile(url, fileName) {
  try {
    // 获取资源
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`无法下载文件，状态码：${response.status}`);
    }

    // 将响应体转换为Blob
    const blob = await response.blob();
    // 处理Blob对象，触发下载
    handleDownloadBlob(blob, fileName);
  } catch (error) {
    console.error("文件下载出错:", error);
  }
}

/**
 * @desc 处理Blob对象，触发下载
 * @param {Blob} blob Blob对象
 * @param {string} fileName 下载文件名
 * @returns {void}
 */
function handleDownloadBlob(blob, fileName) {
  // 创建一个临时的URL表示Blob对象
  const url = URL.createObjectURL(blob);

  // 创建隐藏的下载链接
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // 设置下载的文件名
  a.style.display = "none"; // 隐藏链接

  // 将链接添加到DOM中
  document.body.appendChild(a);

  // 触发点击事件开始下载
  a.click();

  // 下载后释放URL并移除隐藏的链接
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
```

2.预览图片：通过`window.URL.createObjectURL()`方法，将 Blob 对象转换为 URL，然后通过`<img>`标签预览。

```html
<input type="file" id="imageFile" accept="image/*" />
<img id="previewImage" src="" alt="Image preview" />

<script>
  document.getElementById("imageFile").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    // 创建一个Blob URL来预览图片
    const blobURL = URL.createObjectURL(file); // file本身就是一个Blob
    document.getElementById("previewImage").src = blobURL;

    // 不需要时释放URL以避免内存泄漏
    document.getElementById("previewImage").addEventListener("load", function () {
      URL.revokeObjectURL(blobURL);
    });
  });
</script>
```

<!-- todo：待补充 -->

3.文件切片：通过`Blob.slice()`方法，将 Blob 对象切割成多个片段，然后上传到服务器。

<!-- todo：待补充 -->

4.本地读取文件：通过`FileReader`对象，将 Blob 对象转换为文本或二进制数据。
