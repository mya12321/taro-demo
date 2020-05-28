import { Block, View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './make-phone-call.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '打电话',
      path: 'page/API/pages/make-phone-call/make-phone-call'
    }
  },

  data: {
    disabled: true
  },
  bindInput(e) {
    this.inputValue = e.detail.value

    if (this.inputValue.length > 0) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  makePhoneCall() {
    Taro.makePhoneCall({
      phoneNumber: this.inputValue,
      success() {
        console.log('成功拨打电话')
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '打电话'
  }

  render() {
    const { disabled } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'makePhoneCall' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="desc">请在下方输入电话号码</View>
            <Input
              className="input"
              type="number"
              name="input"
              onInput={this.bindInput}
            ></Input>
            <View className="btn-area">
              <Button
                type="primary"
                onClick={this.makePhoneCall}
                disabled={disabled}
              >
                拨打
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
