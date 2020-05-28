import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './on-network-status-change.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '监听手机网络变化',
      path: 'page/API/pages/on-network-status-change/on-network-status-change'
    }
  },

  data: {
    isConnected: false
  },
  onLoad() {
    const that = this
    Taro.onNetworkStatusChange(function(res) {
      that.setData({
        isConnected: res.isConnected,
        networkType: res.networkType
      })
    })
  },
  onShow() {
    const that = this
    Taro.getNetworkType({
      success(res) {
        that.setData({
          isConnected: res.networkType !== 'none',
          networkType: res.networkType
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '监听手机网络变化'
  }

  render() {
    const { isConnected, networkType } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'onNetworkStatusChange' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <View className="page-body-title">网络状态</View>
              {isConnected === false && (
                <Block>
                  <Text className="page-body-text">没有网络连接</Text>
                </Block>
              )}
              {isConnected === true && (
                <Block>
                  <Text className="page-body-text-network-type">
                    {networkType}
                  </Text>
                </Block>
              )}
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
