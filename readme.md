# 绘制图像

ctx.drawImage(图像对象, x位置, y位置)

ctx.drawImage(图像对象, x位置, y位置, 宽度, 高度)

ctx.drawImage(图像对象, 图像裁剪的位置x, 图像裁剪的位置y, 裁剪的宽度, 裁剪的高度, x位置, y位置, 宽度, 高度)



# 动画

## 基本概念

## 常用的三角函数

![](images/常用的三角函数.png)

## 常用的反三角函数

```javascript
sin(α) = y/c ==> α = arcsin(y/c)
cos(α) = x/c ==> α = arccos(x/c)
tan(α) = y/x ==> α = arctan(y/x)

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

1
