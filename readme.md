# 基本用法

```javascript
<canvas id="canvas" width="150" height="150">您的浏览器不支持canvas元素</canvas>
```

- 在canvas标签中写入文字，如果浏览器不支持canvas标签的话就会显示文字，支持则不显示
- `<canvas></canvas>`标签只有两个属性widht和height，都是可选的。默认宽度为300像素，高度为150像素。

- canvas设置宽高的方法有两种
  - <canvas width="600" height="400"></canvas>

    通过widht和height属性设置，相当于直接设置了画布的大小，此时右下角的坐标是(600,400)

  - <canvas style="width:600;height:400" ></canvas>	

    通过css设置，相当于对画布进行了拉伸或缩放，而画布的右下角坐标仍是(300,150)



## 渲染上下文

`<canvas>`元素有一个叫做`getContext()`的方法，这个方法是用来获得渲染上下文和它的绘画功能。

```javascript
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')  // 获得2D渲染上下文
var ctx = canvas.getContext('WebGL') // 获得3D上下文
```

# 绘制形状

## 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你需要创建路径起始点。
2. 然后你使用[画图命令](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths)去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

以下是所要用到的函数：

- `beginPath()`

  新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

- `closePath()`

  闭合路径之后图形绘制命令又重新指向到上下文中。

- `stroke()`

  通过线条来绘制图形轮廓。

- `fill()`

  通过填充路径的内容区域生成实心的图形。

### 移动笔触

`moveTo(x, y)`

将笔触移动到指定的坐标x以及y上。

### 线

`lineTo(x, y)`

​	绘制一条从当前位置到指定x以及y位置的直线。

### 矩形

`fillRect(x, y, width, height)`  

​	绘制一个填充矩形

`strokeRect(x, y, width, height)` 

​	绘制一个矩形的边框

`clearRect(x, y, width, height)` 

​	清除指定矩形区域，让清除部分完全透明

`rect(x, y, width, height)  `

​	绘制一个左上角坐标为（x,y），宽高为width以及height的矩形

注：x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸。

### 圆弧

`arc(x, y, radius, startAngle, endAngle, anticlockwise)`

​	画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为false顺时针）来生成。 

`arcTo(x1, y1, x2, y2, radius)`

​	根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

### 二次贝塞尔曲线及三次贝塞尔曲线

`quadraticCurveTo(cp1x, cp1y, x, y)`

绘制二次贝塞尔曲线，`cp1x,cp1y`为一个控制点，`x,y为`结束点。

`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

绘制三次贝塞尔曲线，`cp1x,cp1y`为控制点一，`cp2x,cp2y`为控制点二，`x,y`为结束点。





# 添加样式和颜色

## 色彩 Colors

`fillStyle = color`

​	设置图形的填充颜色。

`strokeStyle = color`

​	设置图形轮廓的颜色。

## 透明度 Transparency

`globalAlpha = transparencyValue`

​	这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透	明）到 1.0（完全不透明），默认是 1.0。

`globalAlpha` 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为下面的方法可操作性更强一点。

```javascript
// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

## 线型 Line styles

- [`lineWidth = value`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth)

  设置线条宽度。

  `value`描述线段宽度的数字。 0、 负数、 [`Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity) 和 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 会被忽略。

- [`lineCap = type`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap)

  设置线条末端样式。

  - `butt` 线段末端以方形结束
  - `round` 线段末端以圆形结束
  - `square` 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域

- [`lineJoin = type`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin)

  设定线条与线条间接合处的样式。

  - `round` 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
  - `bevel` 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
  - `miter` 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 [`miterLimit`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit) 属性看到效果。
  - 默认值是 `miter。注意：如果2个相连部分在同一方向，那么lineJoin不会产生任何效果`，因为在那种情况下不会出现连接区域。

- [`miterLimit = value`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit)

  限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

- [`getLineDash()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getLineDash)

  返回一个包含当前虚线样式，长度为非负偶数的数组。

- [`setLineDash(segments)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash)

  设置当前虚线样式。

  `segments` 是一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， `[5, 15, 25]` 会变成 `[5, 15, 25, 5, 15, 25]。`

- [`lineDashOffset = value`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)

  设置虚线样式的起始偏移量。

  `value` 偏移量是float精度的数字。 初始值为 `0.0。`

## 渐变 Gradients

- `createLinearGradient(x1, y1, x2, y2)`

  createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

- `createRadialGradient(x1, y1, r1, x2, y2, r2)`

  createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

```javascript
var lineargradient = ctx.createLinearGradient(0,0,150,150);
var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100);
```

创建出 `canvasGradient` 对象后，我们就可以用 `addColorStop` 方法给它上色了。

- `gradient.addColorStop(position, color)`

  addColorStop 方法接受 2 个参数，`position` 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。`color` 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。

```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // Create gradients
  var lingrad = ctx.createLinearGradient(0,0,0,150);
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');

  var lingrad2 = ctx.createLinearGradient(0,50,0,95);
  lingrad2.addColorStop(0.5, '#000');
  lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;

  // draw shapes
  ctx.fillRect(10,10,130,130);
  ctx.strokeRect(50,50,50,50);

}
```



## 图案样式 Patterns

- `createPattern(image, type)`

  该方法接受两个参数。Image 可以是一个 `Image` 对象的引用，或者另一个 canvas 对象。`Type` 必须是下面的字符串值之一：`repeat`，`repeat-x`，`repeat-y` 和 `no-repeat`。

## 阴影 Shadows

- `shadowOffsetX = float`

  `shadowOffsetX` 和 `shadowOffsetY `用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 `0`。

- `shadowOffsetY = float`

  shadowOffsetX 和 `shadowOffsetY `用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 `0`。

- `shadowBlur = float`

  shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 `0`。

- `shadowColor = color`

  shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

## Canvas 填充规则

当我们用到 `fill`（或者 [`clip`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clip)和[`isPointinPath`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/isPointInPath) ）你可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。

两个可能的值：

-  `nonzero`: [non-zero winding rule](http://en.wikipedia.org/wiki/Nonzero-rule), 默认值

- ` evenodd`: [even-odd winding rule](http://en.wikipedia.org/wiki/Even–odd_rule)

  

# 绘制文本

## 绘制文本

canvas 提供了两种方法来渲染文本:

- `fillText(text, x, y [, maxWidth])`

  在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的。

- `strokeText(text, x, y [, maxWidth])`

  在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的。

## 有样式的文本

- `font = value`

  当前我们用来绘制文本的样式. 这个字符串使用和 [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) 属性相同的语法。默认的字体是 `10px sans-serif`。

  `ctx.font = 'normal small-caps bold 12px 微软雅黑'`

  - font-style 字体样式：normal、italic、oblique
  - font-variant 字体变体：normal、small-caps
  - font-weight 字体粗细：bold
  - font-size / line-height 字号/行高，以像素计
  - font-family 字体系列

   `font` 字体相关的属性的简写：

  - 必须包含以下值：
    - font-size
    - font-family
  - 可以选择性包含以下值：
    - font-style
    - font-variant
    - font-weight
    - line-height
  - `font-style`, `font-variant` 和 `font-weight` 必须在 `font-size` 之前
  - 在 CSS 2.1 中 `font-variant` 只可以是 `normal` 和 `small-caps`
  - `line-height` 必须跟在 `font-size` 后面，由 "/" 分隔，例如 "`16px/3`"
  - `font-family` 必须最后指定

- `textAlign = value`

  文本对齐选项。可选的值包括：`start`, `end`, `left`, `right` or `center`。 默认值是 `start`。

- `textBaseline = value`

  基线对齐选项。可选的值包括：`top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`。默认值是 `alphabetic。`

- `direction = value`

  文本方向。可能的值包括：`ltr`, `rtl`, `inherit`。默认值是 `inherit。`

## 预测量文本宽度

当你需要获得更多的文本细节时，下面的方法可以给你测量文本的方法。

- `measureText(text)`

  `text`需要测量的String

  将返回一个 [`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics)对象的宽度、所在像素，这些体现文本特性的属性。

```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d')
  var text = 'hello world'
  ctx.font = "48px 微软雅黑"
  ctx.textAlign = 'center'
  ctx.Baseline = 'middle'
  ctx.fillText(text, 10, 50);
  console.log(ctx.measureText(text).width) 
}
```



# 使用图片

canvas更有意思的一项特性就是图像操作能力。可以用于动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格式的外部图片都可以使用，比如PNG、GIF或者JPEG。 你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源。

## 获得需要绘制的图片

canvas的API可以使用下面这些类型中的一种作为图片的源：

- `HTMLImageElement`

  这些图片是由`Image()函数构造出来的，或者任何的<img>元素`

- `HTMLVideoElement`

  用一个HTML的`<video>`元素作为你的图片源，可以从视频中抓取当前帧作为一个图像

- `HTMLCanvasElement`

  可以使用另一个`<canvas>`元素作为你的图片源。

- `ImageBitmap`

  这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

## 绘制图片

正常：`ctx.drawImage(图像对象, x位置, y位置)`

缩放：`ctx.drawImage(图像对象, x位置, y位置, 宽度, 高度)`

切片：`ctx.drawImage(图像对象, 图像裁剪的位置x, 图像裁剪的位置y, 裁剪的宽度, 裁剪的高度, x位置, y位置, 宽度, 高度)`



# 变形

## 状态的保存和恢复

- `save()`

  保存画布(canvas)的所有状态

- `restore()`

  save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

Canvas状态存储在栈中，每当`save()`方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：

- 当前应用的变形（即移动，旋转和缩放，见下）
- 以及下面这些属性：[`strokeStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle), [`fillStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle), [`globalAlpha`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalAlpha), [`lineWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth), [`lineCap`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap), [`lineJoin`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin), [`miterLimit`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit), [`lineDashOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset), [`shadowOffsetX`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX), [`shadowOffsetY`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY), [`shadowBlur`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur), [`shadowColor`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor), [`globalCompositeOperation`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation), [`font`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font), [`textAlign`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign), [`textBaseline`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline), [`direction`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/direction), [`imageSmoothingEnabled`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)
- 当前的[裁切路径（clipping path）](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing#clipping_paths)，会在下一节介绍

你可以调用任意多次 `save`方法。每一次调用 `restore` 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

## 移动 Translating

- `translate(x, y)`

  `translate `方法接受两个参数。x 是左右偏移量，y 是上下偏移量

  移动是将整个坐标尺进行移动

## 旋转 Rotating

- `rotate(angle)`

  这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

  旋转是将整个坐标尺进行旋转

## 缩放 Scaling

我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。

- `scale(x, y)`

  `scale ` 方法可以缩放画布的水平和垂直的单位。两个参数都是实数，可以为负数，x 为水平缩放因子，y 为垂直缩放因子，如果比1小，会缩小图形， 如果比1大会放大图形。默认值为1， 为实际大小。

  缩放是将整个坐标尺进行缩放

## 变形 Transforms

- `transform(a, b, c, d, e, f)`

  

  

# 合成与裁剪

| 属性                     | 描述                                     |
| ------------------------ | ---------------------------------------- |
| globalAlpha              | 设置或返回绘图的当前alpha或透明值        |
| globalCompositeOperation | 设置或者返回新图像如何绘制到已有的图像上 |

`globalCompositeOperation`的属性值：

 

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| source-over      | 这是默认设置，并在现有画布上下文之上绘制新图形。             |
| source-in        | 新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。 |
| source-out       | 在不与现有画布内容重叠的地方绘制新图形。                     |
| source-atop      | 新图形只在与现有画布内容重叠的地方绘制。                     |
| destination-over | 在现有的画布内容后面绘制新的图形。                           |
| destination-in   | 现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。 |
| destination-out  | 现有内容保持在新图形不重叠的地方。                           |
| destination-atop | 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。 |
| lighter          | 两个重叠图形的颜色是通过颜色值相加来确定的。                 |
| copy             | 只显示新图形。                                               |
| xor              | 图像中，那些重叠和正常绘制之外的其他地方是透明的。           |
| multiply         | 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。       |
| screen           | 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。           |
| overlay          | multiply和screen的结合，原本暗的地方更暗，原本亮的地方更亮。 |
| darken           | 保留两个图层中最暗的像素。                                   |
| lighten          | 保留两个图层中最亮的像素。                                   |
| color-dodge      | 将底层除以顶层的反置。                                       |
| color-burn       | 将反置的底层除以顶层，然后将结果反过来。                     |
| hard-light       | 屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了。 |
| soft-light       | 用顶层减去底层或者相反来得到一个正值。                       |
| difference       | 一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。 |
| exclusion        | 和difference相似，但对比度较低。                             |
| hue              | 保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）。 |
| saturation       | 保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）。 |
| color            | 保留了底层的亮度（luma），同时采用了顶层的色调(hue)和色度(chroma)。 |
| luminosity       | 保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）。 |









# 基本动画







# 高级动画

## 基本概念

## 常用的三角函数

![](images\三角函数.png)

```javascript
sin(α) = a/c ==> α = arcsin(a/c)
cos(α) = b/c ==> α = arccos(b/c)
tan(α) = a/b ==> α = arctan(a/b)

360° = 2π
1° = π/180
1弧度 = 180/π
sin(0)  ==> Math.sin(0 * Math.PI / 180)
cos(0)  ==> Math.cos(0 * Math.PI / 180)
tan(0)  ==> Math.tan(0 * Math.PI / 180)
arcsin(a/c) ==> Math.asin(y/c) * 180 / Math.PI
arccos(b/c) ==> Math.acos(x/c) * 180 / Math.PI
arctan(a/b) ==> Math.atan(y/x) * 180 / Math.PI
```





- 平滑运动
- 线性运动
- 脉冲运动
  - 将sin函数应用到物体大小的变化中，以达到平滑的放大和缩小



## 圆周运动

### 正圆运动

![](images\正圆运动.png)

当θ从0弧度变到2π弧度的时候，说明绕着圆转了一圈

### 椭圆运动

![](images\椭圆运动.png)

椭圆x轴和y轴的半径是不相等的

a表示x轴的半径

b表示y轴的半径



## 速度向量

![](images\速度向量的合成.png)



![](images\速度向量的分解.png)

如果小球以每帧2像素30度角的方向运动，将这个速度分解成x轴和y轴速度

vx = 2 * Math.cos(30)

vy = 2 * Math.sin(30)



## 加速度

加速度（Acceleration）是[速度变化量](https://baike.baidu.com/item/速度变化量/5978449)与发生这一变化所用时间的[比值](https://baike.baidu.com/item/比值/8246782) Δ*v*/Δ*t*，是描述物体速度变化快慢的[物理量](https://baike.baidu.com/item/物理量/9984692)，通常用*a*表示，单位是米/平方秒。加速度是[矢量](https://baike.baidu.com/item/矢量/1400417)，它的方向是物体[速度](https://baike.baidu.com/item/速度/5456)变化（量）的方向，与[合外力](https://baike.baidu.com/item/合外力/1549807)的方向相同。

加速度有大小，有方向，是矢量。

### 单轴加速度

### 任意方向上的加速度

![](images\任意方向的加速度.png)

```javascript
已知加速度a，角度30，进行分解
x轴的加速度 = a * Math.cos(30) 
y轴的加速度 = a * Math.sin(30)
```

### 重力加速度

地球表面附近的物体因受重力产生的加速度叫做[重力加速度](https://baike.baidu.com/item/重力加速度)，也叫[自由落体加速度](https://baike.baidu.com/item/自由落体加速度)，用g表示。

重力加速度g的方向总是竖直向下的。在同一地区的同一高度，任何物体的重力加速度都是相同的。重力加速度的数值随[海拔高度](https://baike.baidu.com/item/海拔高度)增大而减小。当物体距地面高度远远小于[地球半径](https://baike.baidu.com/item/地球半径)时，g变化不大。而离地面高度较大时，重力加速度g数值显著减小，此时不能认为g为常数。

距离地面同一高度的重力加速度，也会随着纬度的升高而变大。

由于g随纬度变化不大，因此国际上将在纬度45°的海平面精确测得物体的重力加速度g=9.80665m/s²；作为重力加速度的标准值。在解决地球表面附近的问题中，通常将g作为常数，在一般计算中可以取g=9.80m/s²。



## 环境边界

越界处理

- 将物体移除
- 将物体设置回边界内，就像产生了一个新的物体一样
- 让同一个物体出现在边界的另一个位置
  - 屏幕环绕
- 将物体反弹回到边界内
  - 检查物体是否越过边界
  - 如果发生越界，那么将物体置回边界
  - 对物体的速度向量取反

### 边界检测

canvas画布宽度为w，高度为h。小球圆心坐标(x, y)，半径为r

- 小球边界检测
  - 左边界：`x <= r`
  - 右边界：`x + r >= w`
  - 上边界：`y <= r`
  - 下边界：`y + r >= h`





## 摩擦阻力

- 正确方法

  ```
  const speed = 10 // 速度
  const friction = 1 // 摩擦阻力
  speed = speed > friction ? speed - friction : 0
  ```

- 简单方法

  ```
  const speed = 10 
  const friction = 0.8 // 阻力系数
  speed = speed * friction
  ```

  

## 鼠标和绘制对象的交互

对canvas上的绘制对象进行拖拽

结合运动的拖拽

投掷物体

![](images\鼠标是否在园内.png)

```
判断鼠标是否在圆上或者园内
鼠标的坐标(x,y)
圆心的坐标(a,b)
圆的半径长r
r >= Math.sqrt((x -a)² + (y-b)²) // true的话，说明鼠标在圆上或者圆内
```



# 像素操作

可以通过ImageData对象操纵像素数据，直接读取或将数据数组写入该对象中。

## ImageData 对象

[`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)对象中存储着canvas对象真实的像素数据，它包含以下几个只读属性：

- `width`

  图片宽度，单位是像素

- `height`

  图片高度，单位是像素

- `data`

  [`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)类型的一维数组，包含着RGBA格式的整型数据，范围在0至255之间（包括255）。

data属性返回一个 [`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)，它可以被使用作为查看初始像素数据。每个像素用4个1bytes值(按照红，绿，蓝和透明值的顺序; 这就是"RGBA"格式) 来代表。每个颜色值部份用0至255来代表。每个部份被分配到一个在数组内连续的索引，左上角像素的红色部份在数组的索引0位置。像素从左到右被处理，然后往下，遍历整个数组。

[`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) 包含高度 × 宽度 × 4 bytes数据，索引值从0到(`高度`×宽度×4)-1

根据行、列读取某像素点的R/G/B/A值的公式：

```javascript
// 获取50行，第200列的像素，0是红色部分，1是绿色部分，2是蓝色部分，3是透明值
imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 0/1/2/3]
```

## 创建一个`ImageData对象`

创建了一个新的具体特定尺寸的ImageData`对象`，所有像素被预设为透明黑。

```javascript
var myImageData = ctx.createImageData(width, height)
```

创建一个被anotherImageData`对象`指定的相同像素的ImageData`对象`。这个新的`对象`像素全部被预设为透明黑。这个并非复制了图片数据。

```javascript
var myImageData = ctx.createImageData(anotherImageData)
```

## 得到场景像素数据

为了获得一个包含画布场景像素数据的ImageData对像，你可以用getImageData()方法：

```javascript
var myImageData = ctx.getImageData(left, top, width, height)
```

这个方法会返回一个ImageData`对象`，它代表了画布区域的`对象`数据，此画布的四个角落分别表示为(left, top), (left + width, top), (left, top + height), 以及(left + width, top + height)四个点。这些坐标点被设定为画布坐标空间元素。

注：任何在画布以外的元素都会被返回成一个透明黑的ImageData对像。

## 在场景中写入像素数据

你可以用putImageData()方法去对场景进行像素数据的写入。

```javascript
ctx.putImageData(myImageData, dx, dy)
```

dx和dy参数表示你希望在场景内左上角绘制的像素数据所得到的设备坐标

![](images\像素与坐标关系.png)



## 缩放和反锯齿



## 保存图片

- `canvas.toDataURL('image/png')`

  默认设定。创建一个PNG图片。

- `canvas.toDataURL('image/jpeg', quality)`

  最好品质，0基本不被辨析但有比较小的文件大小。

- `canvas.toBlob(callback, type, encoderOptions)`

  创建一个在画布中的代表图片的Blob对像。

1

1

1

1

1

1

1

1

1

1

1

1
