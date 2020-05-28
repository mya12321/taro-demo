import { Block, View, Text, Canvas, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './on-accelerometer-change.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '监听重力感应数据',
      path: 'page/API/pages/on-accelerometer-change/on-accelerometer-change'
    }
  },

  data: {
    x: 0,
    y: 0,
    z: 0,
    enabled: true
  },
  onReady() {
    this.drawBigBall()
    const that = this

    this.position = {
      x: 151,
      y: 151,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0
    }
    Taro.onAccelerometerChange(function(res) {
      that.setData({
        x: res.x.toFixed(2),
        y: res.y.toFixed(2),
        z: res.z.toFixed(2)
      })
      that.position.ax = Math.sin((res.x * Math.PI) / 2)
      that.position.ay = -Math.sin((res.y * Math.PI) / 2)
      // that.drawSmallBall()
    })

    this.interval = setInterval(function() {
      that.drawSmallBall()
    }, 17)
  },
  drawBigBall() {
    const context = Taro.createContext()
    context.beginPath(0)
    context.arc(151, 151, 140, 0, Math.PI * 2)
    context.setFillStyle('#ffffff')
    context.setStrokeStyle('#aaaaaa')
    context.fill()
    // context.stroke()
    Taro.drawCanvas({
      canvasId: 'big-ball',
      actions: context.getActions()
    })
  },
  drawSmallBall() {
    const p = this.position
    let strokeStyle = 'rgba(1,1,1,0)'

    p.x += p.vx
    p.y += p.vy
    p.vx += p.ax
    p.vy += p.ay

    // eslint-disable-next-line
    if (
      Math.sqrt(
        Math.pow(Math.abs(p.x) - 151, 2) + Math.pow(Math.abs(p.y) - 151, 2)
      ) >= 115
    ) {
      if (p.x > 151 && p.vx > 0) {
        p.vx = 0
      }
      if (p.x < 151 && p.vx < 0) {
        p.vx = 0
      }
      if (p.y > 151 && p.vy > 0) {
        p.vy = 0
      }
      if (p.y < 151 && p.vy < 0) {
        p.vy = 0
      }
      strokeStyle = '#ff0000'
    }

    const context = Taro.createContext()
    context.beginPath(0)
    context.arc(p.x, p.y, 15, 0, Math.PI * 2)
    context.setFillStyle('#1aad19')
    context.setStrokeStyle(strokeStyle)
    context.fill()
    // context.stroke()
    Taro.drawCanvas({
      canvasId: 'small-ball',
      actions: context.getActions()
    })
  },
  startAccelerometer() {
    if (this.data.enabled) {
      return
    }
    const that = this
    Taro.startAccelerometer({
      success() {
        that.setData({
          enabled: true
        })
      }
    })
  },
  stopAccelerometer() {
    if (!this.data.enabled) {
      return
    }
    const that = this
    Taro.stopAccelerometer({
      success() {
        that.setData({
          enabled: false
        })
      }
    })
  },
  onUnload() {
    clearInterval(this.interval)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '监听重力感应数据'
  }

  render() {
    const { x, y, z, enabled } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'onAccelerometerChange' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section_center">
            <Text className="page-body-text">倾斜手机即可移动下方小球</Text>
            <View className="page-body-canvas">
              <Canvas
                className="page-body-ball"
                show={true}
                canvasId="big-ball"
              ></Canvas>
              <Canvas
                className="page-body-ball"
                show={true}
                canvasId="small-ball"
              ></Canvas>
            </View>
            <View className="page-body-xyz">
              <Text className="page-body-title">{'X: ' + x}</Text>
              <Text className="page-body-title">{'Y: ' + y}</Text>
              <Text className="page-body-title">{'Z: ' + z}</Text>
            </View>
            <View className="page-body-controls">
              <Button onClick={this.startAccelerometer} disabled={enabled}>
                开始监听
              </Button>
              <Button onClick={this.stopAccelerometer} disabled={!enabled}>
                停止监听
              </Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
