import { Block, View, Canvas, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './worker.scss'
const { fib } = require('../../../../util/util.js')

@withWeapp({
  onShareAppMessage() {
    return {
      title: '多线程Worker',
      path: 'page/API/pages/worker/worker'
    }
  },

  data: {
    res: '',
    input: 35
  },

  onLoad() {
    this._worker = Taro.createWorker('workers/fib/index.js')
  },

  onUnload() {
    clearInterval(this.interval)
    if (this._worker) this._worker.terminate()
  },

  bindInput(e) {
    const val = Number(e.detail.value)
    if (val > 40) return { value: 40 }
    if (Number.isNaN(val)) return { value: 33 }
    this.setData({
      input: val
    })
    return undefined
  },

  reset() {
    this.setData({ res: '' })
  },

  compute() {
    this.reset()
    Taro.showLoading({
      title: '计算中...'
    })
    const t0 = +Date.now()
    const res = fib(this.data.input)
    const t1 = +Date.now()
    Taro.hideLoading()
    this.setData({
      res,
      time: t1 - t0
    })
  },

  multiThreadCompute() {
    this.reset()
    Taro.showLoading({
      title: '计算中...'
    })

    const t0 = +Date.now()
    this._worker.postMessage({
      type: 'execFunc_fib',
      params: [this.data.input]
    })
    this._worker.onMessage(res => {
      if (res.type === 'execFunc_fib') {
        Taro.hideLoading()
        const t1 = +Date.now()
        this.setData({
          res: res.result,
          time: t1 - t0
        })
      }
    })
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

    const context = Taro.createContext()

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

    Taro.drawCanvas({
      canvasId: 'canvas',
      actions: context.getActions()
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '多线程Worker'
  }

  render() {
    const { input, res } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'Worker' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-wrapper">
            <Canvas canvasId="canvas" className="canvas"></Canvas>
          </View>
        </View>
        <View className="page-section">
          <View className="weui-cells__title">计算斐波那契数</View>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell weui-cell_input">
              <Input
                className="weui-input"
                type="number"
                value={input}
                onInput={this.bindInput}
              ></Input>
            </View>
          </View>
          <View className="weui-cells__title">结果</View>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell weui-cell_input">
              <View className="weui-input">{res}</View>
            </View>
          </View>
          <View className="page-section-title">
            提示：使用单线程进行计算时，动画会出现明显的卡顿现象。使用 Worker
            线程进行计算，则可以保证动画的流畅。
          </View>
          <View className="btn-area">
            <Button onClick={this.compute}>单线程计算</Button>
            <Button type="primary" onClick={this.multiThreadCompute}>
              利用 Worker 线程计算
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
