import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '页面跳转',
      path: 'page/API/pages/navigator/navigator'
    }
  },

  navigateTo() {
    Taro.navigateTo({ url: './navigator' })
  },

  navigateBack() {
    Taro.navigateBack()
  },

  redirectTo() {
    Taro.redirectTo({ url: './navigator' })
  },

  switchTab() {
    Taro.switchTab({ url: '/page/component/index' })
  },

  reLaunch() {
    Taro.reLaunch({ url: '/page/component/index' })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '页面跳转'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'navigateTo/Back, redirectTo' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <Button onClick={this.navigateTo}>跳转新页面</Button>
            <Button onClick={this.navigateBack}>返回上一页</Button>
            <Button onClick={this.redirectTo}>在当前页面打开</Button>
            <Button onClick={this.switchTab}>跳转到组件Tab页</Button>
            <Button onClick={this.reLaunch}>关闭所有页面并跳转</Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
