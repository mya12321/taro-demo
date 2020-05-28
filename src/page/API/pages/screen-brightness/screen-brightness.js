import { Block, View, Text, Slider } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './screen-brightness.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '屏幕亮度',
      path: 'page/API/pages/screen-brightness/screen-brightness'
    }
  },

  data: {
    screenBrightness: 0
  },

  onLoad() {
    this._updateScreenBrightness()
  },

  changeBrightness(e) {
    const value = Number.parseFloat(e.detail.value.toFixed(1))
    Taro.setScreenBrightness({
      value,
      success: () => {
        this._updateScreenBrightness()
      }
    })
  },

  _updateScreenBrightness() {
    Taro.getScreenBrightness({
      success: res => {
        this.setData({
          screenBrightness: Number.parseFloat(res.value.toFixed(1))
        })
      },
      fail(err) {
        console.error(err)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '屏幕亮度'
  }

  render() {
    const { screenBrightness } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'get/set/ScreenBrightness' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-info">
            <View className="page-body-title">当前屏幕亮度</View>
            <Text className="page-body-text-screen-brightness">
              {screenBrightness}
            </Text>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">设置屏幕亮度</View>
            <View className="body-view">
              <Slider
                onChange={this.changeBrightness}
                value={screenBrightness}
                min="0"
                max="1"
                step="0.1"
              ></Slider>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
