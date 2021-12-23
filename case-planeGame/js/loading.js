// 加载loading类
class Loading {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.width = config.width
    this.height = config.height
    this.frame = config.frame
    this.frameIndex = 0
    this.speed = config.speed
    this.lastTime = new Date().getTime()
  }
  // 判断是否需要移动
  judge() {
    let currentTime = new Date().getTime()
    if (currentTime - this.lastTime > this.speed) {
      this.frameIndex++
      if (this.frameIndex === this.frame.length - 1) {
        state = RUNNING
      }
      this.lastTime = currentTime
    }
  }
  // 绘图方法
  paint(context) {
    context.drawImage(this.frame[this.frameIndex], this.x, this.y)
  }
}
