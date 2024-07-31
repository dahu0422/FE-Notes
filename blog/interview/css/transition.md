# *CSS3* 过渡

*CSS3* 新增了过渡属性，可以使用从一个状态变化到另一个状态时，变化更加的平滑。*W3C* 标准中是这样描述 *transition* 的：

*CSS3* 的 *transition* 允许 *CSS* 的属性值在一定的时间区间内平滑的过渡。这种效果可以在鼠标单击，获得焦点，对元素任何改变中触发，并平滑地以动画效果改变 *CSS* 的属性值。

先看一个快速入门示例，如下：

```html
<div></div>
```

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
}
div:hover{
  height: 300px;
}
```

在上面的代码中，当 *div* 被 *hover* 的时候，改变其高度，但是效果看起来非常的生硬。此时就可以添加一个 *CSS3* 新增的属性 *transition*，使其两个状态变化之间产生一个过渡效果。

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transition: all .5s;
  /* 添加过渡效果 */
}
div:hover{
  height: 300px;
}
```

## transition 属性

*transition* 属性是 *transition-property，transition-duration，transition-timing-function* 和 *transition-delay* 的一个简写属性。

- *transition-property*：指定过渡的 *CSS* 属性
- *transition-duration*：指定过渡所需的完成时间
- *transition-timing-function*：指定过渡函数
- *transition-delay*：指定过渡的延迟时间

***transition-property***

该属性用来指定**过渡动画 *CSS* 属性名称**，该属性的语法如下：

```css
transition-property: none | all ｜ property
```

![image-20210915094158901](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-15-014159.png)

需要特别说明的是，并不是所有的属性都可以进行过渡，只有属性是具有一个中点值的属性才能够进行过渡效果。因为这样才能通过不停的修改中间值从而实现过渡效果。例如 *display:none|block* 就没有中间值，所以无法应用过渡。

能够过渡的属性类型有颜色属性、具有长度值或百分比的属性、阴影、变形系列属性，具体支持过渡的属性可以参阅下表：

| 支持过渡的属性    |                     |                     |                     |
| ----------------- | ------------------- | ------------------- | ------------------- |
| background-color  | background-position | border-bottom-color | border-bottom-width |
| border-left-color | border-left-width   | border-right-color  | border-right-width  |
| border-spacing    | border-top-color    | border-top-width    | bottom              |
| clip              | color               | font-size           | font-weight         |
| height            | left                | letter-spacing      | line-height         |
| margin-bottom     | margin-left         | margin-right        | margin-top          |
| max-height        | max-width           | min-height          | min-width           |
| opacity           | outline-color       | outline-width       | padding-bottom      |
| padding-left      | padding-right       | padding-top         | right               |
| text-indent       | text-shadow         | vertical-align      | visibility          |
| width             | word-spacing        | z-index             |                     |

***transition-duration***

该属性主要用于设置一个属性过渡到另一个属性所需要的**时间**，单位为秒(*s*)或者毫秒(*ms*)。默认值为 *0*，代表变换是即时的。

***transition-timing-function***

该属性用于设置**过渡的速度**，有如下的取值：

![image-20210915094104556](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-15-014104.png)

***transition-delay***

过渡延迟多久触发，单位为秒或者毫秒。但是值可以是正整数，负整数和 *0*。

正整数和 *0* 都比较好理解，这里主要说一下负整数。负整数的计算会从整体过渡时间中去做减法运算，举个例子：

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transition: all 5s -2s;
  /* 设置为 -2s，相当于已经执行了 2s */
}
div:hover{
  height: 300px;
}
```

## 使用 transition

### **多个元素过渡**

如果要对多个 *CSS3* 属性应用过渡效果，直接用逗号分离开即可，这种主要是针对每个属性过渡的时间不同的情况下。

例如下面的例子：背景颜色过渡时间为 *2s*，而宽度的过渡时间为 *5s*：

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transition: background-color 2s, height 5s;
}
div:hover{
  height: 300px;
  background-color: pink;
}
```

当然，如果每个属性的过渡时间都一样的话，那么直接使用 *all* 会更简洁一些。

### ***hover* 时期不同的过渡设置**

我们可以在 *hover* 时对状态的变化设置一个过渡效果，鼠标移开元素恢复时设置另一个过渡效果。例如：

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transition: all 5s
    /* 鼠标移走时的过渡 */
}
div:hover{
  height: 300px;
  background-color: pink;
  transition: all 2s;
  /* 鼠标 hover 时状态变化的过渡 */
}
```

## **过渡事件**

有些时候，在 *JS* 中的某些操作需要过渡效果结束后再执行，此时事件类型中给我们提供了一个 *transitionend* 事件方便我们监听过渡效果是否结束，例如：

```html
<div id="oDiv"></div>
```

```css
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transition: all 3s
}
```

```js
var div = document.getElementById("oDiv");
div.onclick = function(){
  div.style.height = "400px";
}
div.ontransitionend = function(){
  console.log("过渡结束后触发");
}
```

## 真题解答

- *CSS3* 中 *transition* 和 *animation* 的属性分别有哪些（哔哩哔哩）

> 参考答案：
>
> *transition* 过渡动画：
>
> - *transition-property*：指定过渡的 *CSS* 属性
> - *transition-duration*：指定过渡所需的完成时间
> - *transition-timing-function*：指定过渡函数
> - *transition-delay*：指定过渡的延迟时间
>
> *animation* 关键帧动画：
>
> - *animation-name*：指定要绑定到选择器的关键帧的名称
> - *animation-duration*：动画指定需要多少秒或毫秒完成
> - *animation-timing-function*：设置动画将如何完成一个周期
> - *animation-delay*：设置动画在启动前的延迟间隔
> - *animation-iteration-count*：定义动画的播放次数
> - *animation-direction*：指定是否应该轮流反向播放动画
> - *animation-fill-mode*：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
> - *animation-play-state*：指定动画是否正在运行或已暂停

- *CSS* 动画如何实现？

> 参考答案：
>
> 即 *animation* 属性，对元素某个或多个属性的变化进行控制，可以设置多个关键帧。属性包含了动画的名称、完成时间（以毫秒计算）、周期、间隔、播放次数、是否反复播放、不播放时应用的样式、动画暂停或运行。
>
> 它不需要触发任何事件就可以随着时间变化来改变元素的样式。
>
> **使用 *CSS* 做动画**：
>
> - *@keyframes* 规定动画。
> - *animation* 所有动画属性的简写属性。
> - *animation-name* 规定 *@keyframes* 动画的名称。
> - *animation-duration* 规定动画完成一个周期所花费的秒或毫秒。默认是 0。
> - *animation-timing-function* 规定动画的速度曲线。默认是 *ease*。
> - *animation-fill-mode* 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
> - *animation-delay* 规定动画何时开始。默认是 *0*。
> - *animation-iteration-count*  规定动画被播放的次数。默认是 *1*。
> - *animation-direction* 规定动画是否在下一周期逆向地播放。默认是 *normal*。
> - *animation-play-state* 规定动画是否正在运行或暂停。默认是 *running*。

-*EOF*-
