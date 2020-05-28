import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './scan-code.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '扫码',
      path: 'page/API/pages/scan-code/scan-code'
    }
  },

  data: {
    result: ''
  },

  scanCode() {
    const that = this
    Taro.scanCode({
      success(res) {
        that.setData({
          result: res.result
        })
      },
      fail() {}
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '扫码'
  }

  render() {
    const { result } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'scanCode' }}></HeadTmpl>
        <View className="page-body">
          <View className="weui-cells__title">扫码结果</View>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell">
              <View className="weui-cell__bd">{result}</View>
            </View>
          </View>
          <View className="btn-area">
            <Button type="primary" onClick={this.scanCode}>
              扫一扫
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
