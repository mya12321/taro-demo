import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './get-network-type.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '获取手机网络状态',
      path: 'page/API/pages/get-network-type/get-network-type'
    }
  },

  data: {
    hasNetworkType: false
  },
  getNetworkType() {
    const that = this
    Taro.getNetworkType({
      success(res) {
        console.log(res)
        that.setData({
          hasNetworkType: true,
          networkType: res.subtype || res.networkType
        })
      }
    })
  },
  clear() {
    this.setData({
      hasNetworkType: false,
      networkType: ''
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '获取手机网络状态'
  }

  render() {
    const { hasNetworkType, networkType } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'getNetworkType' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <View className="page-body-title">网络状态</View>
              {hasNetworkType === false && (
                <Block>
                  <Text className="page-body-text">未获取</Text>
                  <Text className="page-body-text">
                    点击绿色按钮可获取网络状态
                  </Text>
                </Block>
              )}
              {hasNetworkType === true && (
                <Block>
                  <Text className="page-body-text-network-type">
                    {networkType}
                  </Text>
                </Block>
              )}
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.getNetworkType}>
                获取手机网络状态
              </Button>
              <Button onClick={this.clear}>清空</Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
