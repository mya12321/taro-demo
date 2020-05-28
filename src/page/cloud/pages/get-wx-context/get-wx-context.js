import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './get-wx-context.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'WXContext',
      path: 'page/cloud/pages/get-wx-context/get-wx-context'
    }
  },

  data: {
    hasWXContext: false,
    wxContext: {},
    loading: false
  },

  getWXContext() {
    this.setData({
      loading: true
    })
    Taro.cloud.callFunction({
      name: 'wxContext',
      data: {},
      success: res => {
        console.log('[云函数] [wxContext] wxContext: ', res.result)
        this.setData({
          hasWXContext: true,
          wxContext: res.result,
          loading: false
        })
      },
      fail: err => {
        console.error('[云函数] [wxContext] 调用失败', err)
      }
    })
  },

  clear() {
    this.setData({
      hasWXContext: false,
      wxContext: {}
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'WXContext'
  }

  render() {
    const { hasWXContext, wxContext, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'getWXContext' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <View className="page-body-title">WXContext</View>
              {!hasWXContext ? (
                <Block>
                  <Text className="page-body-text">
                    云函数是在云端（服务器端）运行的函数
                  </Text>
                  <Text className="page-body-text">
                    点击绿色按钮可调用云函数获取微信调用上下文
                  </Text>
                  <Text className="page-body-text">
                    返回内容包括用户 OpenID、小程序 AppID 以及用户 UnionID（满足
                    UnionID 获取条件时）
                  </Text>
                </Block>
              ) : (
                <Block>
                  <Block>
                    <Text className="page-body-text">OpenID</Text>
                    <Text className="context-value">{wxContext.openid}</Text>
                  </Block>
                  <Block>
                    <Text className="page-body-text">AppID</Text>
                    <Text className="context-value">{wxContext.appid}</Text>
                  </Block>
                  {wxContext.unionid && (
                    <Block>
                      <Text className="page-body-text">UnionID</Text>
                      <Text className="context-value">{wxContext.unionid}</Text>
                    </Block>
                  )}
                </Block>
              )}
            </View>
            <View className="btn-area">
              <Button
                type="primary"
                onClick={this.getWXContext}
                loading={loading}
              >
                获取 WXContext
              </Button>
              <Button onClick={this.clear}>清空</Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
} // 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-server-api/utils/getWXContext.html

export default _C
