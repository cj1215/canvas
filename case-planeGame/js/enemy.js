// 敌机类
class Enemy {
  constructor(config) {
    // 敌机类型
    this.type = config.type
    // 敌机宽度
    this.width = config.width
    // 敌机高度
    this.height = config.height
    // 敌机初始化位置
    this.x = Math.floor(Math.random() * (w - config.width))
    this.y = -config.height
    // 敌机生命次数
    this.life = config.life
    // 敌机分数
    this.score = config.score
    // 敌机图片库
    this.frame = config.frame
    // 此时此刻展示的图片
    this.img = this.frame.live[0]
    // 敌机是否活着的标识
    this.live = true
    // 敌机最小速度、敌机最大速度
    // this.minSpeed = config.minSpeed
    // this.maxSpeed = config.maxSpeed
    this.speed = Math.floor(Math.random() * (config.minSpeed - config.maxSpeed + 1)) + config.maxSpeed
    // 最后时间，表示在这个时间段内它是不变化的，但是过了这个时间就要变化
    this.lastTime = new Date().getTime()
    // 死亡下标
    this.deathIndex = 0
    // 确认销毁
    this.destroy = false
  }
  // 判断是否需要渲染/怎么渲染/是否移动
  move() {
    let currentTime = new Date().getTime()
    if (currentTime - this.lastTime >= this.speed) {
      if (this.live) {
        // 飞机是活着的状态
        this.img = this.frame.live[0]
        this.y++
      } else {
        // 飞机是死亡状态
        this.img = this.frame.death[this.deathIndex++]
        if (this.deathIndex === this.frame.death.length) {
          this.destroy = true
        }
      }
      this.lastTime = currentTime
    }
  }
  // 渲染敌机
  paint(context) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  // 检测敌机是否碰撞道其他物体(子弹/hero)
  hit(o) {
    // 其他物体的左边 右边 顶边 底边
    let ol = o.x
    let or = o.x + o.width
    let ot = o.y
    let ob = o.y + o.height
    // 敌机的左边 右边 顶边 底边
    let el = this.x
    let er = this.x + this.width
    let et = this.y
    let eb = this.y + this.height
    // 判断是或否有碰撞到
    if (ol > er || or < el || ot > eb || ob < et) {
      return false
    } else {
      return true
    }
  }
  // 如果敌机跟子弹碰到的话
  collide() {
    // 中弹了，生命减少1
    this.life--
    // 当这个实例的生命降低为0的时候，就需要调用其他方法
    if (this.life === 0) {
      // 1.将live标识符标记为死亡状态
      // 2.播放死亡动画
      // 3.播放死亡动画完毕之后才真正的销毁掉这架飞机
      this.live = false
      // 增加分数
      score += this.score
    }
  }
  // 敌机是否超出屏幕
  outOfBounds() {
    if (this.y - this.heigth > h) {
      return true
    } else {
      return false
    }
  }
}
