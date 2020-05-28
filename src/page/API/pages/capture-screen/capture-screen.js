import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './capture-screen.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '用户截屏事件',
      path: 'page/API/pages/capture-screen/capture-screen'
    }
  },

  data: {
    captured: false
  },
  onLoad() {
    Taro.onUserCaptureScreen(() => {
      this.setData({
        captured: true
      })
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '用户截屏事件'
  }

  render() {
    const { captured } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'onUserCaptureScreen' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-info">
            <View className="page-body-title">请进行屏幕截屏</View>
            <Text className="page-body-text">
              {'截屏事件' + (captured ? '已' : '未') + '触发'}
            </Text>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
