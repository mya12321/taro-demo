import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './login.scss'
const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '微信登录',
      path: 'page/API/pages/login/login'
    }
  },

  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {},
  login() {
    const that = this
    Taro.login({
      success() {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '微信登录'
  }

  render() {
    const { hasLogin } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'Login' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            {hasLogin === true && (
              <Block>
                <Text className="page-body-title">已登录</Text>
                <Text className="page-body-text">
                  每个微信号中仅需登录 1 次，后续每次进入页面即可根据微信 id
                  自动拉取用户信息
                </Text>
              </Block>
            )}
            {hasLogin === false && (
              <Block>
                <Text className="page-body-text">每个微信号中仅需登录一次</Text>
                <Button
                  className="page-body-button"
                  type="primary"
                  onClick={this.login}
                >
                  微信登录
                </Button>
              </Block>
            )}
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
