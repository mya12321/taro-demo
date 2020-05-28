import { Block, View, Label, Checkbox, CheckboxGroup } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './checkbox.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'checkbox',
      path: 'page/component/pages/checkbox/checkbox'
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

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'checkbox'
  }

  render() {
    const { items } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'checkbox' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">默认样式</View>
            <Label className="checkbox">
              <Checkbox value="cb" checked="true"></Checkbox>选中
            </Label>
            <Label className="checkbox">
              <Checkbox value="cb"></Checkbox>未选中
            </Label>
          </View>
          <View className="page-section">
            <View className="page-section-title">推荐展示样式</View>
            <View className="weui-cells weui-cells_after-title">
              <CheckboxGroup onChange={this.checkboxChange}>
                {items.map((item, index) => {
                  return (
                    <Label
                      className="weui-cell weui-check__label"
                      key={item.value}
                    >
                      <View className="weui-cell__hd">
                        <Checkbox
                          value={item.value}
                          checked={item.checked}
                        ></Checkbox>
                      </View>
                      <View className="weui-cell__bd">{item.name}</View>
                    </Label>
                  )
                })}
              </CheckboxGroup>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
