import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './toast.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '消息提示框',
      path: 'page/API/pages/toast/toast'
    }
  },

  toast1Tap() {
    Taro.showToast({
      title: '默认'
    })
  },

  toast2Tap() {
    Taro.showToast({
      title: 'duration 3000',
      duration: 3000
    })
  },

  toast3Tap() {
    Taro.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 5000
    })
  },

  hideToast() {
    Taro.hideToast()
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '消息提示框'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'toast' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <View className="body-view">
              <Button type="default" onClick={this.toast1Tap}>
                点击弹出默认toast
              </Button>
            </View>
            <View className="body-view">
              <Button type="default" onClick={this.toast2Tap}>
                点击弹出设置duration的toast
              </Button>
            </View>
            <View className="body-view">
              <Button type="default" onClick={this.toast3Tap}>
                点击弹出显示loading的toast
              </Button>
            </View>
            <View className="body-view">
              <Button type="default" onClick={this.hideToast}>
                点击隐藏toast
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
