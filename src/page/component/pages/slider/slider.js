import { Block, View, Slider } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './slider.scss'
const pageData = {
  onShareAppMessage() {
    return {
      title: 'slider',
      path: 'page/component/pages/slider/slider'
    }
  }
}

for (let i = 1; i < 5; ++i) {
  ;(function(index) {
    pageData['slider' + index + 'change'] = function(e) {
      console.log('slider' + index + '发生change事件，携带值为', e.detail.value)
    }
  })(i)
}

@withWeapp(pageData)
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'slider'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'slider' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">设置step</View>
            <View className="body-view">
              <Slider
                value="60"
                onChange={this.slider2change}
                step="5"
              ></Slider>
            </View>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">显示当前value</View>
            <View className="body-view">
              <Slider
                value="50"
                onChange={this.slider3change}
                showValue
              ></Slider>
            </View>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">设置最小/最大值</View>
            <View className="body-view">
              <Slider
                value="100"
                onChange={this.slider4change}
                min="50"
                max="200"
                showValue
              ></Slider>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
