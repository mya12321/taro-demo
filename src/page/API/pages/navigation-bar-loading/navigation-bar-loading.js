import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '标题栏加载动画',
      path: 'page/API/pages/navigation-bar-loading/navigation-bar-loading'
    }
  },

  showNavigationBarLoading() {
    Taro.showNavigationBarLoading()
  },
  hideNavigationBarLoading() {
    Taro.hideNavigationBarLoading()
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '标题栏加载动画'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'navigationBarLoading' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <Button type="primary" onClick={this.showNavigationBarLoading}>
              显示加载动画
            </Button>
            <Button onClick={this.hideNavigationBarLoading}>
              隐藏加载动画
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
