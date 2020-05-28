import { Block, View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './get-system-info.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '获取手机系统信息',
      path: 'page/API/pages/get-system-info/get-system-info'
    }
  },

  data: {
    systemInfo: {}
  },
  getSystemInfo() {
    const that = this
    Taro.getSystemInfo({
      success(res) {
        that.setData({
          systemInfo: res
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '获取手机系统信息'
  }

  render() {
    const { systemInfo } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'getSystemInfo' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">手机品牌</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    disabled={true}
                    placeholder="未获取"
                    value={systemInfo.brand}
                  ></Input>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">手机型号</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    disabled={true}
                    placeholder="未获取"
                    value={systemInfo.model}
                  ></Input>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">微信语言</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    disabled={true}
                    placeholder="未获取"
                    value={systemInfo.language}
                  ></Input>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">微信版本</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    disabled={true}
                    placeholder="未获取"
                    value={systemInfo.version}
                  ></Input>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">屏幕宽度</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    disabled={true}
                    placeholder="未获取"
                    value={systemInfo.windowWidth}
                  ></Input>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">屏幕高度</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    disabled={true}
                    placeholder="未获取"
                    value={systemInfo.windowHeight}
                  ></Input>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">DPR</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    disabled={true}
                    placeholder="未获取"
                    value={systemInfo.pixelRatio}
                  ></Input>
                </View>
              </View>
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.getSystemInfo}>
                获取手机系统信息
              </Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
