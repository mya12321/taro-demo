import { Block, View, Switch } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './switch.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'switch',
      path: 'page/component/pages/switch/switch'
    }
  },

  switch1Change(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },

  switch2Change(e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'switch'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'switch' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">默认样式</View>
            <View className="body-view">
              <Switch checked onChange={this.switch1Change}></Switch>
              <Switch onChange={this.switch2Change}></Switch>
            </View>
          </View>
          <View className="page-section">
            <View className="page-section-title">推荐展示样式</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_switch">
                <View className="weui-cell__bd">开启中</View>
                <View className="weui-cell__ft">
                  <Switch checked></Switch>
                </View>
              </View>
              <View className="weui-cell weui-cell_switch">
                <View className="weui-cell__bd">关闭</View>
                <View className="weui-cell__ft">
                  <Switch></Switch>
                </View>
              </View>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
