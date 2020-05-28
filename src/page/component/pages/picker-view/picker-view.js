import { Block, View, PickerView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './picker-view.scss'
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'picker-view',
      path: 'page/component/pages/picker-view/picker-view'
    }
  },

  data: {
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
    isDaytime: true
  },

  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      isDaytime: !val[3]
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'picker-view'
  }

  render() {
    const {
      year,
      month,
      day,
      isDaytime,
      value,
      years,
      months,
      days
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'picker-view' }}></HeadTmpl>
        <View className="page-body">
          <View className="selected-date">
            {year +
              '年' +
              month +
              '月' +
              day +
              '日' +
              (isDaytime ? '白天' : '夜晚')}
          </View>
          <PickerView
            indicatorStyle="height: 50px;"
            style="width: 100%; height: 300px;"
            value={value}
            onChange={this.bindChange}
          >
            <PickerViewColumn>
              {years.map((item, index) => {
                return (
                  <View
                    key={years}
                    style="line-height: 50px; text-align: center;"
                  >
                    {item + '年'}
                  </View>
                )
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              {months.map((item, index) => {
                return (
                  <View
                    key={months}
                    style="line-height: 50px; text-align: center;"
                  >
                    {item + '月'}
                  </View>
                )
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              {days.map((item, index) => {
                return (
                  <View
                    key={days}
                    style="line-height: 50px; text-align: center;"
                  >
                    {item + '日'}
                  </View>
                )
              })}
            </PickerViewColumn>
            <PickerViewColumn>
              <View className="icon-container">
                <Image
                  className="picker-icon"
                  src={require('../../resources/kind/daytime.png')}
                ></Image>
              </View>
              <View className="icon-container">
                <Image
                  className="picker-icon"
                  src={require('../../resources/kind/night.png')}
                ></Image>
              </View>
            </PickerViewColumn>
          </PickerView>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
