// 我方飞机类
class Hero {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.width = config.width
    this.height = config.height
    this.live = true // true活着 false死亡
    this.frame = config.frame
    this.frameLiveIndex = 0
    this.frameDeathIndex = 0
    this.img = null // 当前展示的图片
    this.speed = config.speed
    this.lastTime = new Date().getTime()
    // 最后一次的射击时间
    this.lastShootTime = new Date().getTime()
    // 发射子弹的间隔时间
    this.shootInterval = config.shootInterval
    this.bulletList = [] // 子弹夹数组
    // 是否销毁
    this.destroy = false
  }
  judge() {
    let currentTime = new Date().getTime()
    if (currentTime - this.lastTime > this.speed) {
      if (this.live) {
        this.img = this.frame.live[this.frameLiveIndex % this.frame.live.length]
        this.frameLiveIndex++
      } else {
        this.img = this.frame.death[this.frameDeathIndex++]
        if (this.frameDeathIndex === this.frame.death.length) {
          this.destroy = true
        }
      }
      this.lastTime = currentTime
    }
  }
  paint(context) {
    context.drawImage(this.img, this.x, this.y)
  }
  // 发射子弹
  shoot() {
    let currentTime = new Date().getTime()
    if (currentTime - this.lastShootTime > this.shootInterval) {
      let bullet = new Bullet(BULLET, this.x + this.width / 2 - BULLET.width / 2, this.y - BULLET.height)
      this.bulletList.push(bullet)
      bullet.paint(context)
      this.lastShootTime = currentTime
    }
  }
  // 如果我方飞机跟敌机碰撞到的话，状态改为死亡状态
  collient() {
    this.live = false
  }
}
