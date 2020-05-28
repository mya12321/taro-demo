import { Block, View, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './picker.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'picker',
      path: 'page/component/pages/picker/picker'
    }
  },

  data: {
    array: ['中国', '美国', '巴西', '日本'],
    index: 0,
    date: '2016-09-01',
    time: '12:01'
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'picker'
  }

  render() {
    const { index, array, time, date } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'picker' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells__title">地区选择器</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">当前选择</View>
                </View>
                <View className="weui-cell__bd">
                  <Picker
                    onChange={this.bindPickerChange}
                    value={index}
                    range={array}
                  >
                    <View className="weui-input">{array[index]}</View>
                  </Picker>
                </View>
              </View>
            </View>
            <View className="weui-cells__title">时间选择器</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">当前选择</View>
                </View>
                <View className="weui-cell__bd">
                  <Picker
                    mode="time"
                    value={time}
                    start="09:01"
                    end="21:01"
                    onChange={this.bindTimeChange}
                  >
                    <View className="weui-input">{time}</View>
                  </Picker>
                </View>
              </View>
            </View>
            <View className="weui-cells__title">日期选择器</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">当前选择</View>
                </View>
                <View className="weui-cell__bd">
                  <Picker
                    mode="date"
                    value={date}
                    start="2015-09-01"
                    end="2017-09-01"
                    onChange={this.bindDateChange}
                  >
                    <View className="weui-input">{date}</View>
                  </Picker>
                </View>
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
