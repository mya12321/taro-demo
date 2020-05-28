import { Block, View, Text, Navigator, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './view.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'view',
      path: 'page/component/pages/view/view'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'view'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'view' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-section-title">
              <Text>flex-direction: row\n横向布局</Text>
            </View>
            <View className="page-section-spacing">
              <View className="flex-wrp" style="flex-direction:row;">
                <View className="flex-item demo-text-1"></View>
                <View className="flex-item demo-text-2"></View>
                <View className="flex-item demo-text-3"></View>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="page-section-title">
              <Text>flex-direction: column\n纵向布局</Text>
            </View>
            <View className="flex-wrp" style="flex-direction:column;">
              <View className="flex-item flex-item-V demo-text-1"></View>
              <View className="flex-item flex-item-V demo-text-2"></View>
              <View className="flex-item flex-item-V demo-text-3"></View>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
