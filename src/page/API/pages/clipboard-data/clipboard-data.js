import { Block, View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './clipboard-data.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '剪切板',
      path: 'page/API/pages/clipboard-data/clipboard-data'
    }
  },

  data: {
    value: 'edit and copy me',
    pasted: ''
  },

  valueChanged(e) {
    this.setData({
      value: e.detail.value
    })
  },

  copy() {
    Taro.setClipboardData({
      data: this.data.value,
      success() {
        Taro.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  paste() {
    const self = this
    Taro.getClipboardData({
      success(res) {
        self.setData({
          pasted: res.data
        })
        Taro.showToast({
          title: '粘贴成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '剪切板'
  }

  render() {
    const { value, pasted } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'get/set/ClipboardData' }}></HeadTmpl>
        <View className="page-body">
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">Copy</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  name="key"
                  value={value}
                  onInput={this.valueChanged}
                ></Input>
              </View>
            </View>
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">Paste</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  value={pasted}
                ></Input>
              </View>
            </View>
          </View>
          <View className="btn-area">
            <Button type="primary" onClick={this.copy}>
              复制
            </Button>
            <Button onClick={this.paste}>粘贴</Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
