# canvas
canvas 用于绘制图形，本质上是一个位图，可以使用JavaScript控制每个像素点。

## 绘制矩形
- `fillRect(x, y, width, height)`：填充一个矩形。
- `strokeRect(x, y, width, height)`：绘制一个矩形边框。
- `clearRect(x, y, width, height)`：清除指定矩形区域，让清除部分完全透明。

## 绘制路径
- `beginPath()`：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- `closePath`：闭合路径，之后图形绘制命令又被重新指向到上下文中。
- `stroke()`：通过线条来绘制图形轮廓。
- `fill()`：填充图形。

## 移动笔触
`moveTo(x, y)`：移动笔触到指定位置。

当 canvas 初始化后，需要使用 `moveTo` 函数设置起点。

## 线
`lineTo(x, y)`：绘制一条从当前位置到指定位置的直线。
`lineWidth`：设置线条宽度。
`lineCap`：设置线条末端样式。
`lineJoin`：设置线条连接处样式。

## 圆弧
`arc(x, y, radius, startAngle, endAngle, anticlockwise)`：画一个以(x, y)为圆心，radius为半径，从startAngle到endAngle弧度的圆弧。按照 anticlockwise 的值，顺时针或者逆时针绘制。

`arcTo(x1, y1, x2, y2, radius)`：画一个圆弧路径，圆弧路径的起点是(x1, y1)，终点是(x2, y2)，使用半径为radius的圆。

## 贝塞尔曲线
`quadraticCurveTo(cp1x, cp1y, x, y)`：画一条二次贝塞尔曲线。`cp1x, cp1y` 为控制点坐标，`x, y` 为终点坐标。
`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：画一条三次贝塞尔曲线。`cp1x, cp1y` 为控制点一坐标，`cp2x, cp2y` 为控制点二坐标，`x, y` 为终点坐标。 

## 色彩
`fillStyle`：设置填充颜色。
`strokeStyle`：设置描边颜色。

## 文字
`fillText(text, x, y, maxWidth)`：在画布上绘制填色的文本。
`strokeText(text, x, y, maxWidth)`：在画布上绘制描边文本。

文本样式：
- `font`：设置文本样式。
- `textAlign`：设置文本对齐方式。
- `textBaseline`：设置文本基线。
- `direction`：设置文本方向。

## 绘制图片
- `drawImage(img, x, y)`：在画布距左顶点 x/y 位置处绘制图像。
- `drawImage(img, x, y, width, height)`：在画布距左顶点 x/y 位置处绘制图像，并设置图像的宽度和高度。
- `drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`:原图像从坐标 (sx,sy) 处截取一个宽度为 sWidth 高度为 sHeight 的图像。并将其绘制到画布的 (dx, dy) 坐标处，并将其缩放为宽 dWidth、高 dHeight 的图像。

## 变形
- save()：保存当前的绘图上下文。
- restore()：恢复之前保存的绘图上下文。
Canvas 状态存储在栈中，每当save()方法被调用后，当前的状态就被推送到栈中保存。你可以调用任意多次 save方法。每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

- translate(x, y)：将原点移动到(x, y)。