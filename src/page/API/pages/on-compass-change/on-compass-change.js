import { Block, View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './on-compass-change.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '监听罗盘数据',
      path: 'page/API/pages/on-compass-change/on-compass-change'
    }
  },

  data: {
    enabled: true,
    direction: 0
  },
  onReady() {
    const that = this
    Taro.onCompassChange(function(res) {
      that.setData({
        direction: parseInt(res.direction, 10)
      })
    })
  },
  startCompass() {
    if (this.data.enabled) {
      return
    }
    const that = this
    Taro.startCompass({
      success() {
        that.setData({
          enabled: true
        })
      }
    })
  },
  stopCompass() {
    if (!this.data.enabled) {
      return
    }
    const that = this
    Taro.stopCompass({
      success() {
        that.setData({
          enabled: false
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '监听罗盘数据'
  }

  render() {
    const { direction, enabled } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'onCompassChange' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section_center">
            <Text className="page-body-text">旋转手机即可获取方位信息</Text>
            <View className="direction">
              <View className="bg-compass-line"></View>
              <Image
                className="bg-compass"
                src={require('./compass.png')}
                style={'transform: rotate(' + direction + 'deg)'}
              ></Image>
              <View className="direction-value">
                <Text>{direction}</Text>
                <Text className="direction-degree">o</Text>
              </View>
            </View>
            <View className="controls">
              <Button onClick={this.startCompass} disabled={enabled}>
                开始监听
              </Button>
              <Button onClick={this.stopCompass} disabled={!enabled}>
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
