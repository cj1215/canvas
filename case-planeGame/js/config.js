// 配置项文件
var viewWidth = window.innerWidth || document.documentElement.clientWidth
var viewHeight = window.innerHeight || document.documentElement.clientHeight
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const w = (canvas.width = viewWidth)
const h = (canvas.height = viewHeight)

// 游戏的状态
const START = 0 // 开始
const STARTING = 1 // 开始时
const RUNNING = 2 // 运行时
const PAUSE = 3 // 暂停时
const END = 4 // 结束时

const IMAGES = {
  playBtn: 'images/play.png',
  b: 'images/bullet1.png',
  bg: 'images/background.png',
  copyright: 'images/logo.png',
  pause: 'images/game_pause_nor.png',
  loading_frame: ['images/game_loading1.png', 'images/game_loading2.png', 'images/game_loading3.png', 'images/game_loading4.png'],
  hero_frame_live: ['images/hero1.png', 'images/hero2.png'],
  hero_frame_death: ['images/hero_blowup_n1.png', 'images/hero_blowup_n2.png', 'images/hero_blowup_n3.png', 'images/hero_blowup_n4.png'],
  e1_live: ['images/enemy1.png', 'images/enemy1_down1.png'],
  e1_death: ['images/enemy1_down2.png', 'images/enemy1_down3.png', 'images/enemy1_down4.png'],
  e2_live: ['images/enemy2.png'],
  e2_death: ['images/enemy2_down1.png', 'images/enemy2_down2.png', 'images/enemy2_down3.png', 'images/enemy2_down4.png'],
  e3_live: ['images/enemy3_n1.png', 'images/enemy3_n2.png'],
  e3_death: [
    'images/enemy3_down1.png',
    'images/enemy3_down2.png',
    'images/enemy3_down3.png',
    'images/enemy3_down4.png',
    'images/enemy3_down5.png',
    'images/enemy3_down6.png',
  ],
}
function createImage(src) {
  let img
  if (typeof src === 'string') {
    img = new Image()
    img.src = src
  } else {
    img = []
    for (let i = 0; i < src.length; i++) {
      img[i] = new Image()
      img[i].src = src[i]
    }
  }
  return img
}

// 背景图片
const bg = createImage(IMAGES.bg)
// logo图片
const copyright = createImage(IMAGES.copyright)
// 开始游戏图片
const playBtn = createImage(IMAGES.playBtn)
// 初始化四张飞机大战的加载图片
const loading_frame = createImage(IMAGES.loading_frame)
// 初始化我方飞机图片
const hero_frame = {
  live: createImage(IMAGES.hero_frame_live),
  death: createImage(IMAGES.hero_frame_death),
}
// 初始化子弹图片
const bulletImg = createImage(IMAGES.b)
// 敌机
const e1 = {
  live: createImage(IMAGES.e1_live),
  death: createImage(IMAGES.e1_death),
}
const e2 = {
  live: createImage(IMAGES.e2_live),
  death: createImage(IMAGES.e2_death),
}
const e3 = {
  live: createImage(IMAGES.e3_live),
  death: createImage(IMAGES.e3_death),
}

// Sky的配置项
const SKY = {
  bg: bg,
  width: w,
  height: h,
  speed: 10,
}

// LOADING的配置项
const LOADING = {
  x: (w - 186) / 2,
  y: (h - 38) / 2,
  width: 186,
  height: 38,
  frame: loading_frame,
  speed: 1000,
}
// 子弹的配置项
const BULLET = {
  width: bulletImg.width,
  height: bulletImg.height,
  image: bulletImg,
  speed: 10,
}
// 我方飞机的配置项
const HERO = {
  x: (w - 99) / 2,
  y: h - 124 - 20,
  width: 99,
  height: 124,
  frame: hero_frame,
  speed: 10,
  shootInterval: 200,
}
// 小型敌机的配置项
const E1 = {
  type: 1,
  width: 57,
  height: 51,
  life: 1,
  score: 1,
  frame: e1,
  minSpeed: 20,
  maxSpeed: 10,
}
// 中型敌机的配置项
const E2 = {
  type: 2,
  width: 69,
  height: 95,
  life: 5,
  score: 5,
  frame: e2,
  minSpeed: 50,
  maxSpeed: 20,
}
// 大型敌机的配置项
const E3 = {
  type: 3,
  width: 169,
  height: 258,
  life: 20,
  score: 20,
  frame: e3,
  minSpeed: 100,
  maxSpeed: 100,
}
