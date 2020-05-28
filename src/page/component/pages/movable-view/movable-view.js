import {
  Block,
  View,
  MovableArea,
  MovableView,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './movable-view.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'movable-view',
      path: 'page/component/pages/movable-view/movable-view'
    }
  },

  data: {
    x: 0,
    y: 0,
    scale: 2
  },

  tap() {
    this.setData({
      x: 30,
      y: 30
    })
  },

  tap2() {
    this.setData({
      scale: 3
    })
  },

  onChange(e) {
    console.log(e.detail)
  },

  onScale(e) {
    console.log(e.detail)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'movable-view'
  }

  render() {
    const { x, y, scale } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'movable-view' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-section-title first">
              movable-view区域小于movable-area
            </View>
            <MovableArea>
              <MovableView x={x} y={y} direction="all">
                text
              </MovableView>
            </MovableArea>
          </View>
          <View className="btn-area">
            <Button
              onClick={this.tap}
              className="page-body-button"
              type="primary"
            >
              点击移动到 (30px, 30px)
            </Button>
          </View>
          <View className="page-section">
            <View className="page-section-title">
              movable-view区域大于movable-area
            </View>
            <MovableArea>
              <MovableView className="max" direction="all">
                text
              </MovableView>
            </MovableArea>
          </View>
          <View className="page-section">
            <View className="page-section-title">只可以横向移动</View>
            <MovableArea>
              <MovableView direction="horizontal">text</MovableView>
            </MovableArea>
          </View>
          <View className="page-section">
            <View className="page-section-title">只可以纵向移动</View>
            <MovableArea>
              <MovableView direction="vertical">text</MovableView>
            </MovableArea>
          </View>
          <View className="page-section">
            <View className="page-section-title">可超出边界</View>
            <MovableArea>
              <MovableView direction="all" outOfBounds>
                text
              </MovableView>
            </MovableArea>
          </View>
          <View className="page-section">
            <View className="page-section-title">带有惯性</View>
            <MovableArea>
              <MovableView direction="all" inertia>
                text
              </MovableView>
            </MovableArea>
          </View>
          <View className="page-section">
            <View className="page-section-title">可放缩</View>
            <MovableArea scaleArea>
              <MovableView
                direction="all"
                onChange={this.onChange}
                onScale={this.onScale}
                scale
                scaleMin="0.5"
                scaleMax="4"
                scaleValue={scale}
              >
                text
              </MovableView>
            </MovableArea>
          </View>
          <View className="btn-area">
            <Button
              onClick={this.tap2}
              className="page-body-button"
              type="primary"
            >
              点击放大3倍
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
