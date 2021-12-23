// 背景图片类
class Sky {
  constructor(config) {
    // 背景图片
    this.bg = config.bg
    // 背景宽度
    this.width = config.width
    // 背景高度
    this.height = config.height
    // 背景x轴坐标
    this.x = 0
    // 背景y轴坐标
    this.y = 0
    // 背景运动速度
    this.speed = config.speed
    // 最后更新时间
    this.lastTime = new Date().getTime()
  }
  // 判断背景是否需要移动，当前时间 - 速度时间 > 最后更新时间，那么就需要移动，否则不移动
  judge() {
    let currentTime = new Date().getTime()
    if (currentTime - this.speed > this.lastTime) {
      this.y++
      this.lastTime = currentTime
    }
    if (this.y >= this.height) {
      this.y = 0
    }
  }
  // 绘图方法
  paint(context) {
    context.drawImage(this.bg, this.x, this.y, this.width, this.height)
    context.drawImage(this.bg, this.x, -(this.height - this.y), this.width, this.height)
  }
}
