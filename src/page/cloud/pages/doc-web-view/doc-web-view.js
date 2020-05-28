import { Block, WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './doc-web-view.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '小程序云开发文档',
      path: 'page/cloud/pages/doc-web-view/doc-web-view'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '小程序云开发文档'
  }

  render() {
    return (
      <WebView src="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html"></WebView>
    )
  }
}

export default _C
