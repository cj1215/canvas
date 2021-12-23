// 创建一个Sky的实例
const sky = new Sky(SKY)
// 创建一个Loading的实例
const loading = new Loading(LOADING)

// 创建一个我方飞机实例
let hero = new Hero(HERO)
let state = START
// 分数
let score = 0
// 生命
let life = 3

// 注册canvas的点击事件
canvas.onclick = function (e) {
  let x = e.clientX - canvas.offsetLeft
  let y = e.clientY - canvas.offsetTop
  // 点击开始游戏按钮，状态如果是未开始，则改成开始
  const playBtnX = (w - playBtn.width) / 2
  const playBtnY = (h - playBtn.height) / 2 + 70
  if (x >= playBtnX && x <= playBtnX + playBtn.width && y >= playBtnY && y <= playBtnY + playBtn.height) {
    if (state === START) {
      state = STARTING
    }
  }
}
// pc端鼠标移动事件
canvas.onmousemove = function (e) {
  // 飞机跟随鼠标移动
  if (state === RUNNING) {
    const ev = e || window.event
    let x = ev.clientX - canvas.offsetLeft
    let y = ev.clientY - canvas.offsetTop
    if (x < hero.width / 2) x = hero.width / 2
    if (x > w - hero.width / 2) x = w - hero.width / 2
    if (y < hero.height / 2) y = hero.height / 2
    if (y > h - hero.height / 2) y = h - hero.height / 2
    hero.x = x - hero.width / 2
    hero.y = y - hero.height / 2
  }
}
// 移动端手指滑动事件
canvas.ontouchmove = function (e) {
  // 飞机跟随鼠标移动
  if (state === RUNNING) {
    const ev = e.targetTouches[0]
    let x = ev.clientX - canvas.offsetLeft
    let y = ev.clientY - canvas.offsetTop
    if (x < hero.width / 2) x = hero.width / 2
    if (x > w - hero.width / 2) x = w - hero.width / 2
    if (y < hero.height / 2) y = hero.height / 2
    if (y > h - hero.height / 2) y = h - hero.height / 2
    hero.x = x - hero.width / 2
    hero.y = y - hero.height / 2
  }
}

// 全局函数，来判断所有的子弹/敌人组件
function judgeComponent() {
  for (let i = 0; i < hero.bulletList.length; i++) {
    hero.bulletList[i].move()
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move()
  }
}
// 全局函数，来绘制所有的子弹/敌人组件，绘制score和life
function paintComponent() {
  for (let i = 0; i < hero.bulletList.length; i++) {
    hero.bulletList[i].paint(context)
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].paint(context)
  }
  // 绘制score和life
  context.save()
  context.fillStyle = 'red'
  context.font = '20px 微软雅黑'
  context.textAlign = 'left'
  context.fillText(`score:${score}`, 10, 20)
  context.textAlign = 'right'
  context.fillText(`life:${life}`, w - 10, 20)
  context.restore()
}
// 全局函数，来销毁所有的子弹/敌人组件
function deleteComponent() {
  if (hero.destroy) {
    life--
    hero.destroy = true
    if (life === 0) {
      state = END
    } else {
      // 还有生命次数的话，重新生成一个我方飞机实例
      hero = new Hero(HERO)
    }
  }
  for (let i = 0; i < hero.bulletList.length; i++) {
    if (hero.bulletList[i].outOfBounds() || hero.bulletList[i].destroy) {
      hero.bulletList.splice(i, 1)
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].outOfBounds() || enemies[i].destroy) {
      enemies.splice(i, 1)
    }
  }
}

// 所有敌机实例
let enemies = []
// 敌机产生的速率
let ENEMY_CREATE_INTERVAL = 800
let ENEMY_LASTTIME = new Date().getTime()
// 全局函数，隔一段时间就来初始化一架敌机
function createComponent() {
  const currentTime = new Date().getTime()
  if (currentTime - ENEMY_LASTTIME >= ENEMY_CREATE_INTERVAL) {
    // 小飞机60% 中飞机30% 打飞机10%
    let ran = Math.floor(Math.random() * 100)
    if (ran <= 60) {
      enemies.push(new Enemy(E1))
    } else if (ran > 60 && ran <= 90) {
      enemies.push(new Enemy(E2))
    } else {
      enemies.push(new Enemy(E3))
    }
    ENEMY_LASTTIME = currentTime
  }
  console.log(enemies)
}

// 碰撞检测函数
function checkHit() {
  for (let i = 0; i < enemies.length; i++) {
    // 检测所有的敌机和我方飞机有没有碰撞
    if (enemies[i].hit(hero)) {
      enemies[i].collide()
      hero.collient()
    }
    // 检测所有的敌机和子弹有没有碰撞
    for (let j = 0; j < hero.bulletList.length; j++) {
      if (enemies[i].hit(hero.bulletList[j])) {
        // 如果敌机和子弹有碰到的话，清除子弹，敌机生命也要减少
        enemies[i].collide()
        hero.bulletList[j].collide()
      }
    }
  }
}

bg.onload = function () {
  // 每隔10秒清空画布，重新绘制一遍
  setInterval(() => {
    // context.clearRect(0, 0, canvas.width, canvas.height)
    switch (state) {
      case START:
        console.log('还未开始')
        // 渲染背景图并移动
        sky.judge()
        sky.paint(context)
        // 渲染飞机大战LOGO
        const scale = 0.7
        context.drawImage(
          copyright,
          (w - copyright.width * scale) / 2,
          (h - copyright.height * scale) / 2 - 50,
          copyright.width * scale,
          copyright.height * scale,
        )
        context.drawImage(playBtn, (w - playBtn.width) / 2, (h - playBtn.height) / 2 + 70)
        break
      case STARTING:
        console.log('开始了')
        // 渲染背景图并移动
        sky.judge()
        sky.paint(context)
        // 飞机加载类 loading
        loading.paint(context)
        loading.judge()
        break
      case RUNNING:
        console.log('运行时')
        // 渲染背景图并移动
        sky.paint(context)
        sky.judge()
        // 渲染我方飞机和敌方飞机
        hero.judge()
        hero.paint(context)
        hero.shoot()
        // 全局函数，隔一段时间就来初始化一架敌机
        createComponent()
        // 全局函数，来判断所有的子弹/敌人组件
        judgeComponent()
        // 全局函数，来销毁所有的子弹/敌人组件
        deleteComponent()
        // 全局函数，来绘制所有的子弹/敌人组件，绘制score和life
        paintComponent()
        checkHit()
        break
      case PAUSE:
        console.log('暂停时')
        // 渲染一个暂停图标
        break
      case END:
        console.log('结束时')
        // 渲染一个GAME_OVER
        context.font = 'bold 28px 微软雅黑'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText('GAME_OVER', w / 2, 300)
        break
    }
  }, 10)
}
