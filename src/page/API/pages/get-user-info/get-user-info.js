import { Block, View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './get-user-info.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '获取用户信息',
      path: 'page/API/pages/get-user-info/get-user-info'
    }
  },

  data: {
    hasUserInfo: false
  },
  getUserInfo(info) {
    const userInfo = info.detail.userInfo
    this.setData({
      userInfo,
      hasUserInfo: true
    })
  },
  clear() {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '获取用户信息'
  }

  render() {
    const { hasUserInfo, userInfo } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'getUserInfo' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <View className="page-body-title">用户信息</View>
              {hasUserInfo === false && (
                <Block>
                  <Text className="page-body-text">未获取</Text>
                  <Text className="page-body-text">
                    点击绿色按钮可获取用户头像及昵称
                  </Text>
                </Block>
              )}
              {hasUserInfo === true && (
                <Block>
                  <Image
                    className="userinfo-avatar"
                    src={userInfo.avatarUrl}
                  ></Image>
                  <Text className="userinfo-nickname">{userInfo.nickName}</Text>
                </Block>
              )}
            </View>
            <View className="btn-area">
              <Button
                type="primary"
                openType="getUserInfo"
                onGetuserinfo={this.getUserInfo}
              >
                获取用户信息
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
