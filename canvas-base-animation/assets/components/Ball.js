// 小球类
class Ball {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.r = 20
    this.scaleX = 1
    this.scaleY = 1
    this.strokeStyle = 'rgba(0,0,0,0)'
    this.fillStyle = 'rgb(57,119,224)'
    this.alpha = 1 // 透明度
    this.vx = 0 // x轴速度
    this.vy = 0 // y轴速度
    Object.assign(this, props)
    return this
  }
  render(ctx) {
    let { x, y, r, scaleX, scaleY, strokeStyle, fillStyle, alpha } = this
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scaleX, scaleY)
    ctx.strokeStyle = strokeStyle
    ctx.fillStyle = fillStyle
    ctx.globalAlpha = alpha
    ctx.beginPath()
    ctx.arc(0, 0, r, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fill()
    ctx.restore()
    return this
  }
  // 判断鼠标指针是否在圆内
  isPoint(pos) {
    let { x, y } = pos
    return this.r >= Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2)
  }
}
