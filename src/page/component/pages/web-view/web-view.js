import { Block, WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'webview',
      path: 'page/component/pages/web-view/web-view'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'webview'
  }

  render() {
    return (
      <WebView src="https://developers.weixin.qq.com/miniprogram/introduction/"></WebView>
    )
  }
}

export default _C
