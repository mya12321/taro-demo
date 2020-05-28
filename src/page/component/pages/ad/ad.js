import { Block, View, Ad } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './ad.scss'
const info = Taro.getSystemInfoSync()

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'ad',
      path: 'page/component/pages/ad/ad'
    }
  },

  data: {
    platform: info.platform
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'ad'
  }

  render() {
    const { platform } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'ad' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">关注卡片</View>
            <Ad unitId="adunit-demo4"></Ad>
          </View>
          {platform === 'ios' ? (
            <View className="page-section page-section-gap">
              <View className="page-section-title">下载卡片</View>
              <Ad unitId="adunit-demo8"></Ad>
            </View>
          ) : (
            <View className="page-section page-section-gap">
              <View className="page-section-title">下载卡片</View>
              <Ad unitId="adunit-demo9"></Ad>
            </View>
          )}
          {platform === 'ios' ? (
            <View className="page-section page-section-gap">
              <View className="page-section-title">应用推广</View>
              <Ad unitId="adunit-demo2"></Ad>
            </View>
          ) : (
            <View className="page-section page-section-gap">
              <View className="page-section-title">应用推广</View>
              <Ad unitId="adunit-demo7"></Ad>
            </View>
          )}
          <View className="page-section page-section-gap">
            <View className="page-section-title">公众号推广</View>
            <Ad unitId="adunit-demo3"></Ad>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">活动推广</View>
            <Ad unitId="adunit-demo5"></Ad>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">商品推广</View>
            <Ad unitId="adunit-demo6"></Ad>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
