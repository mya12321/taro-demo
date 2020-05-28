import { Block, View, ScrollView, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './animation.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '动画',
      path: 'page/API/pages/animation/animation'
    }
  },

  onReady() {
    this.animation = Taro.createAnimation()
  },
  rotate() {
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.setData({ animation: this.animation.export() })
  },
  scale() {
    this.animation.scale(Math.random() * 2).step()
    this.setData({ animation: this.animation.export() })
  },
  translate() {
    this.animation
      .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
      .step()
    this.setData({ animation: this.animation.export() })
  },
  skew() {
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({ animation: this.animation.export() })
  },
  rotateAndScale() {
    this.animation
      .rotate(Math.random() * 720 - 360)
      .scale(Math.random() * 2)
      .step()
    this.setData({ animation: this.animation.export() })
  },
  rotateThenScale() {
    this.animation
      .rotate(Math.random() * 720 - 360)
      .step()
      .scale(Math.random() * 2)
      .step()
    this.setData({ animation: this.animation.export() })
  },
  all() {
    this.animation
      .rotate(Math.random() * 720 - 360)
      .scale(Math.random() * 2)
      .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
      .skew(Math.random() * 90, Math.random() * 90)
      .step()
    this.setData({ animation: this.animation.export() })
  },
  allInQueue() {
    this.animation
      .rotate(Math.random() * 720 - 360)
      .step()
      .scale(Math.random() * 2)
      .step()
      .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
      .step()
      .skew(Math.random() * 90, Math.random() * 90)
      .step()
    this.setData({ animation: this.animation.export() })
  },
  reset() {
    this.animation
      .rotate(0, 0)
      .scale(1)
      .translate(0, 0)
      .skew(0, 0)
      .step({ duration: 0 })
    this.setData({ animation: this.animation.export() })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '动画'
  }

  render() {
    const { animation } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'createAnimation' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="animation-element-wrapper">
              <View className="animation-element" animation={animation}></View>
            </View>
            <ScrollView className="animation-buttons" scrollY="true">
              <Button className="animation-button" onClick={this.rotate}>
                旋转
              </Button>
              <Button className="animation-button" onClick={this.scale}>
                缩放
              </Button>
              <Button className="animation-button" onClick={this.translate}>
                移动
              </Button>
              <Button className="animation-button" onClick={this.skew}>
                倾斜
              </Button>
              <Button
                className="animation-button"
                onClick={this.rotateAndScale}
              >
                旋转并缩放
              </Button>
              <Button
                className="animation-button"
                onClick={this.rotateThenScale}
              >
                旋转后缩放
              </Button>
              <Button className="animation-button" onClick={this.all}>
                同时展示全部
              </Button>
              <Button className="animation-button" onClick={this.allInQueue}>
                顺序展示全部
              </Button>
              <Button
                className="animation-button animation-button-reset"
                onClick={this.reset}
              >
                还原
              </Button>
            </ScrollView>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
