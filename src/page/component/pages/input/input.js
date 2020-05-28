import { Block, View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './input.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'input',
      path: 'page/component/pages/input/input'
    }
  },

  data: {
    focus: false,
    inputValue: ''
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  bindReplaceInput(e) {
    const value = e.detail.value
    let pos = e.detail.cursor
    let left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos

      // 或者直接返回字符串,光标在最后边
      // return value.replace(/11/g,'2'),
    }
  },

  bindHideKeyboard(e) {
    if (e.detail.value === '123') {
      // 收起键盘
      Taro.hideKeyboard()
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'input'
  }

  render() {
    const { inputValue } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'input' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells__title">可以自动聚焦的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  autoFocus
                  placeholder="将会获取焦点"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">控制最大输入长度的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  maxlength="10"
                  placeholder="最大输入长度为10"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">
              {'实时获取输入值：' + inputValue}
            </View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  maxlength="10"
                  onInput={this.bindKeyInput}
                  placeholder="输入同步到view中"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">控制输入的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  onInput={this.bindReplaceInput}
                  placeholder="连续的两个1会变成2"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">控制键盘的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  onInput={this.bindHideKeyboard}
                  placeholder="输入123自动收起键盘"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">数字输入的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  type="number"
                  placeholder="这是一个数字输入框"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">密码输入的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  password
                  type="text"
                  placeholder="这是一个密码输入框"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">带小数点的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  type="digit"
                  placeholder="带小数点的数字键盘"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">身份证输入的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  type="idcard"
                  placeholder="身份证输入键盘"
                ></Input>
              </View>
            </View>
          </View>
          <View className="page-section">
            <View className="weui-cells__title">控制占位符颜色的input</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input
                  className="weui-input"
                  placeholderStyle="color:#F76260"
                  placeholder="占位符字体是红色的"
                ></Input>
              </View>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
