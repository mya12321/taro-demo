import {
  Block,
  View,
  CheckboxGroup,
  Label,
  Checkbox,
  Text,
  RadioGroup,
  Radio
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './label.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'label',
      path: 'page/component/pages/label/label'
    }
  },

  data: {
    checkboxItems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' }
    ],
    radioItems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' }
    ],
    hidden: false
  },

  checkboxChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  radioChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  tapEvent() {
    console.log('按钮被点击')
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'label'
  }

  render() {
    const { checkboxItems, radioItems } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'label' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">表单组件在label内</View>
            <CheckboxGroup className="group" onChange={this.checkboxChange}>
              {checkboxItems.map((item, index) => {
                return (
                  <View className="label-1">
                    <Label>
                      <Checkbox
                        value={item.name}
                        checked={item.checked}
                      ></Checkbox>
                      <Text className="label-1-text">{item.value}</Text>
                    </Label>
                  </View>
                )
              })}
            </CheckboxGroup>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">label用for标识表单组件</View>
            <RadioGroup className="group" onChange={this.radioChange}>
              {radioItems.map((item, index) => {
                return (
                  <View className="label-2">
                    <Radio
                      id={item.name}
                      value={item.name}
                      checked={item.checked}
                    ></Radio>
                    <Label className="label-2-text" for={item.name}>
                      <Text>{item.name}</Text>
                    </Label>
                  </View>
                )
              })}
            </RadioGroup>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">
              label内有多个时选中第一个
            </View>
            <Label className="label-3">
              <Checkbox className="checkbox-3">选项一</Checkbox>
              <Checkbox className="checkbox-3">选项二</Checkbox>
              <View className="label-3-text">
                点击该label下的文字默认选中第一个checkbox
              </View>
            </Label>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
