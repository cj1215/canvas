// 子弹类
class Bullet {
  constructor(config, x, y) {
    this.width = config.width
    this.height = config.height
    this.img = config.image
    this.x = x
    this.y = y
    this.speed = config.speed
    this.lastTime = new Date().getTime()
    // 是否需要销毁
    this.destroy = false
  }
  paint(context) {
    context.drawImage(this.img, this.x, this.y)
  }
  // 移动子弹
  move() {
    this.y -= 2
  }
  // 子弹是否超出边界
  outOfBounds() {
    return this.y < -this.height
  }
  // 子弹跟敌机碰撞到的话，需要销毁子弹
  collide() {
    this.destroy = true
  }
}
