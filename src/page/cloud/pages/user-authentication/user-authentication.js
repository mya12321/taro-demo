import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './user-authentication.scss'
const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '用户鉴权',
      path: 'page/cloud/pages/user-authentication/user-authentication'
    }
  },

  data: {
    openid: '',
    loading: false
  },

  onGetOpenid() {
    this.setData({
      loading: true
    })
    app
      .getUserOpenIdViaCloud()
      .then(openid => {
        this.setData({
          openid,
          loading: false
        })
        return openid
      })
      .catch(err => {
        console.error(err)
      })
  },

  clear() {
    this.setData({
      openid: ''
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '用户鉴权'
  }

  render() {
    const { openid, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'User Authentication' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <View className="page-body-title">OpenID</View>
              {!openid ? (
                <Block>
                  <Text className="page-body-text">
                    点击绿色按钮可通过云开发获取用户 OpenID
                  </Text>
                  <Text className="page-body-text">
                    使用云开发，无需自己部署服务端并维护复杂的鉴权机制，在小程序端简单调用即可通过云端获取天然可信任的用户登录态
                  </Text>
                </Block>
              ) : (
                <Block>
                  <Text className="openid">{openid}</Text>
                </Block>
              )}
            </View>
            <View className="btn-area">
              <Button
                type="primary"
                onClick={this.onGetOpenid}
                loading={loading}
              >
                获取 OpenID
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
