import {
  Block,
  View,
  Form,
  Switch,
  RadioGroup,
  Label,
  Radio,
  CheckboxGroup,
  Checkbox,
  Slider,
  Input,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './form.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    pickerHidden: true,
    chosen: ''
  },

  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'form'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'form' }}></HeadTmpl>
        <View className="page-body">
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            <View className="page-section page-section-gap">
              <View className="page-section-title">switch</View>
              <Switch name="switch"></Switch>
            </View>
            <View className="page-section page-section-gap">
              <View className="page-section-title">radio</View>
              <RadioGroup name="radio">
                <Label>
                  <Radio value="radio1"></Radio>选项一
                </Label>
                <Label>
                  <Radio value="radio2"></Radio>选项二
                </Label>
              </RadioGroup>
            </View>
            <View className="page-section page-section-gap">
              <View className="page-section-title">checkbox</View>
              <CheckboxGroup name="checkbox">
                <Label>
                  <Checkbox value="checkbox1"></Checkbox>选项一
                </Label>
                <Label>
                  <Checkbox value="checkbox2"></Checkbox>选项二
                </Label>
              </CheckboxGroup>
            </View>
            <View className="page-section page-section-gap">
              <View className="page-section-title">slider</View>
              <Slider value="50" name="slider" showValue></Slider>
            </View>
            <View className="page-section">
              <View className="page-section-title">input</View>
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__bd">
                    <Input
                      className="weui-input"
                      name="input"
                      placeholder="这是一个输入框"
                    ></Input>
                  </View>
                </View>
              </View>
            </View>
            <View className="btn-area">
              <Button type="primary" formType="submit">
                Submit
              </Button>
              <Button formType="reset">Reset</Button>
            </View>
          </Form>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
