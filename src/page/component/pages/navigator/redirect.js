import { Block, View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './redirect.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'redirectPage',
      path: 'page/component/pages/navigator/redirect'
    }
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      title: options.title
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'redirectPage'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'navigator' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <Navigator
              url="navigate?title=navigate"
              hoverClass="navigator-hover"
            >
              <Button type="default">跳转到新页面</Button>
            </Navigator>
            <Navigator
              url="redirect?title=redirect"
              redirect
              hoverClass="other-navigator-hover"
            >
              <Button type="default">在当前页打开</Button>
            </Navigator>
            <Navigator
              target="miniProgram"
              openType="navigate"
              appId="wx4f1b24bdc99fa23b"
              version="release"
            >
              <Button type="default">打开小程序</Button>
            </Navigator>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
