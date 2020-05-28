import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './pull-down-refresh.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '下拉刷新',
      path: 'page/API/pages/pull-down-refresh/pull-down-refresh'
    }
  },

  onPullDownRefresh() {
    Taro.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  },

  stopPullDownRefresh() {
    Taro.stopPullDownRefresh({
      complete(res) {
        Taro.hideToast()
        console.log(res, new Date())
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '下拉刷新',
    enablePullDownRefresh: true
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'on/stopPullDownRefresh' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <Text className="page-body-text">下滑页面即可刷新</Text>
            </View>
            <View className="btn-area">
              <Button onClick={this.stopPullDownRefresh}>停止刷新</Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
