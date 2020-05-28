import { Block, View, Label, Radio, RadioGroup } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './radio.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'radio',
      path: 'page/component/pages/radio/radio'
    }
  },

  data: {
    items: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国', checked: 'true' },
      { value: 'BRA', name: '巴西' },
      { value: 'JPN', name: '日本' },
      { value: 'ENG', name: '英国' },
      { value: 'FRA', name: '法国' }
    ]
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'radio'
  }

  render() {
    const { items } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'radio' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">默认样式</View>
            <Label className="radio">
              <Radio value="r1" checked="true"></Radio>选中
            </Label>
            <Label className="radio">
              <Radio value="r2"></Radio>未选中
            </Label>
          </View>
          <View className="page-section">
            <View className="page-section-title">推荐展示样式</View>
            <View className="weui-cells weui-cells_after-title">
              <RadioGroup onChange={this.radioChange}>
                {items.map((item, index) => {
                  return (
                    <Label
                      className="weui-cell weui-check__label"
                      key={item.value}
                    >
                      <View className="weui-cell__hd">
                        <Radio value={item.value} checked="true"></Radio>
                      </View>
                      <View className="weui-cell__bd">{item.name}</View>
                    </Label>
                  )
                })}
              </RadioGroup>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
