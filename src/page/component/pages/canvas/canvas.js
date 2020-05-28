import { Block, View, Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './canvas.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'canvas',
      path: 'page/component/pages/canvas/canvas'
    }
  },

  onReady() {
    this.position = {
      x: 150,
      y: 150,
      vx: 2,
      vy: 2
    }

    this.drawBall()
    this.interval = setInterval(this.drawBall, 17)
  },

  drawBall() {
    const p = this.position
    p.x += p.vx
    p.y += p.vy
    if (p.x >= 300) {
      p.vx = -2
    }
    if (p.x <= 7) {
      p.vx = 2
    }
    if (p.y >= 300) {
      p.vy = -2
    }
    if (p.y <= 7) {
      p.vy = 2
    }

    const context = Taro.createCanvasContext('canvas')

    function ball(x, y) {
      context.beginPath(0)
      context.arc(x, y, 5, 0, Math.PI * 2)
      context.setFillStyle('#1aad19')
      context.setStrokeStyle('rgba(1,1,1,0)')
      context.fill()
      context.stroke()
    }

    ball(p.x, 150)
    ball(150, p.y)
    ball(300 - p.x, 150)
    ball(150, 300 - p.y)
    ball(p.x, p.y)
    ball(300 - p.x, 300 - p.y)
    ball(p.x, 300 - p.y)
    ball(300 - p.x, p.y)

    context.draw()
  },

  onUnload() {
    clearInterval(this.interval)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'canvas'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'canvas' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-wrapper">
            <Canvas canvasId="canvas" className="canvas"></Canvas>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
