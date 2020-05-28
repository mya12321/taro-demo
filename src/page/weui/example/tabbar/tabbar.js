import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpTabbar from '../../components/tabbar/tabbar'
import './tabbar.scss'

@withWeapp({
  data: {
    list: [
      {
        text: '对话',
        iconPath: global.isDemo
          ? '/page/weui/example/images/tabbar_icon_chat_default.png'
          : '/example/images/tabbar_icon_chat_default.png',
        selectedIconPath: global.isDemo
          ? '/page/weui/example/images/tabbar_icon_chat_active.png'
          : '/example/images/tabbar_icon_chat_active.png',
        dot: true
      },
      {
        text: '设置',
        iconPath: global.isDemo
          ? '/page/weui/example/images/tabbar_icon_setting_default.png'
          : '/example/images/tabbar_icon_setting_default.png',
        selectedIconPath: global.isDemo
          ? '/page/weui/example/images/tabbar_icon_setting_active.png'
          : '/example/images/tabbar_icon_setting_active.png',
        badge: 'New'
      }
    ]
  },
  tabChange(e) {
    console.log('tab change', e)
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { list } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Tabbar</View>
          <View className="page__desc">
            类似小程序原生tabbar的组件，可用于自定义tabbar
          </View>
        </View>
        <MpTabbar
          style="position:fixed;bottom:0;width:100%;left:0;right:0;"
          list={list}
          onChange={this.tabChange}
        ></MpTabbar>
      </View>
    )
  }
}

export default _C
