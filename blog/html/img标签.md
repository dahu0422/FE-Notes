# img 标签
`<img>` 标签用于在页面中显示图像，是一个**可替换元素**，默认分辨率由被嵌入的图片的原始宽高确定。

属性：
- src：图像的 URL；
- alt：图像的替代文本；
- width/height：图像的宽度和高度，以像素为单位的整数值。设置后浏览器在解析HTML文档时会预留显示图像所需要的空间。
- **loading**：指示浏览器何时加载图像；`eager` 立即加载，不管它是否在可视视口；`lazy` 延迟加载图像，直到图片接近视口才加载。
- size：用于响应式设计，根据视口大小选择不同的图像资源。
- secret：提供不同分辨率的图像源，以适应不同设备和屏幕密度。

## 响应式图片
```html
<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px, 800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy" 
/>
```
如果支持响应式图片的浏览器以 480px 的视口来加载页面，那么 (max-width: 600px) 的媒体条件为真，因此 480px 的插槽会被选择，继而将加载 elva-fairy-480w.jpg，因为该图片的固有宽度（480w）最接近于插槽宽度。