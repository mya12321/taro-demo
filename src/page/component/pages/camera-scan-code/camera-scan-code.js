import { Block, View, Camera, Button, Form } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './camera-scan-code.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'camera',
      path: 'page/component/pages/camera-scan-code/camera-scan-code'
    }
  },

  data: {
    result: {}
  },
  onReady() {
    Taro.showModal({
      title: '提示',
      content: '将摄像头对准一维码即可扫描',
      showCancel: false
    })
  },
  scanCode(e) {
    console.log('scanCode:', e)
    this.setData({
      result: e.detail
    })
  },
  navigateBack() {
    Taro.navigateBack()
  },
  error(e) {
    console.log(e.detail)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'camera'
  }

  render() {
    const { result } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'camera' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-wrapper">
            <Camera
              mode="scanCode"
              flash="off"
              onScanCode={this.scanCode}
              onError={this.error}
            ></Camera>
            <View className="btn-area">
              <Button type="primary" onClick={this.navigateBack}>
                返回正常模式
              </Button>
            </View>
            <Form>
              <View className="page-section">
                <View className="weui-cells weui-cells_after-title">
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">类型</View>
                    </View>
                    <View className="weui-cell__bd">{result.type}</View>
                  </View>
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">结果</View>
                    </View>
                    <View className="weui-cell__bd">{result.result}</View>
                  </View>
                </View>
              </View>
            </Form>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
