import { Block, View, Form, Icon, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './setting.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '设置',
      path: 'page/API/pages/setting/setting'
    }
  },

  data: {
    setting: {}
  },

  getSetting() {
    Taro.getSetting({
      success: res => {
        console.log(res)
        this.setData({ setting: res.authSetting })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '设置'
  }

  render() {
    const { setting } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'open/get/Setting' }}></HeadTmpl>
        <View className="page-body">
          <Form>
            <View className="page-section">
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">用户信息</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.userInfo'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">地理位置</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.userLocation'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input region">
                  <View className="weui-cell__hd">
                    <View className="weui-label">通讯地址</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.address'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input detail">
                  <View className="weui-cell__hd">
                    <View className="weui-label">发票抬头</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.invoiceTitle'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">微信运动步数</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.werun'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">录音功能</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.record'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">保存到相册</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.writePhotosAlbum'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">摄像头</View>
                  </View>
                  <View className="weui-cell__bd">
                    {setting['scope.camera'] && (
                      <Icon
                        className="icon-small"
                        type="success_no_circle"
                        size="23"
                      ></Icon>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Form>
          <View className="btn-area">
            <Button type="primary" onClick={this.getSetting}>
              获取小程序设置
            </Button>
            <Button openType="openSetting" type="default">
              打开小程序设置
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
