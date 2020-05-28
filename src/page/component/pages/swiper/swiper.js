import {
  Block,
  View,
  Swiper,
  SwiperItem,
  Switch,
  Text,
  Slider
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './swiper.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'swiper'
  }

  render() {
    const {
      indicatorDots,
      autoplay,
      interval,
      duration,
      background
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'swiper' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-spacing swiper">
            <Swiper
              indicatorDots={indicatorDots}
              autoplay={autoplay}
              interval={interval}
              duration={duration}
            >
              {background.map((item, index) => {
                return (
                  <Block key="*this">
                    <SwiperItem>
                      <View className={'swiper-item ' + item}></View>
                    </SwiperItem>
                  </Block>
                )
              })}
            </Swiper>
          </View>
          <View
            className="page-section"
            style="margin-top: 40rpx;margin-bottom: 0;"
          >
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_switch">
                <View className="weui-cell__bd">指示点</View>
                <View className="weui-cell__ft">
                  <Switch
                    checked={indicatorDots}
                    onChange={this.changeIndicatorDots}
                  ></Switch>
                </View>
              </View>
              <View className="weui-cell weui-cell_switch">
                <View className="weui-cell__bd">自动播放</View>
                <View className="weui-cell__ft">
                  <Switch
                    checked={autoplay}
                    onChange={this.changeAutoplay}
                  ></Switch>
                </View>
              </View>
            </View>
          </View>
          <View className="page-section page-section-spacing">
            <View className="page-section-title">
              <Text>幻灯片切换时长(ms)</Text>
              <Text className="info">{duration}</Text>
            </View>
            <Slider
              onChange={this.durationChange}
              value={duration}
              min={500}
              max={2000}
            ></Slider>
            <View className="page-section-title">
              <Text>自动播放间隔时长(ms)</Text>
              <Text className="info">{interval}</Text>
            </View>
            <Slider
              onChange={this.intervalChange}
              value={interval}
              min={2000}
              max={10000}
            ></Slider>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
