import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './navbar.scss'
var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置

@withWeapp({
  data: {
    tabs: ['选项一', '选项二', '选项三'],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function() {
    var that = this
    Taro.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft:
            (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset:
            (res.windowWidth / that.data.tabs.length) * that.data.activeIndex
        })
      }
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { tabs, activeIndex } = this.data
    return (
      <View className="page">
        <View className="page__bd">
          <View className="weui-tab">
            <View className="weui-navbar">
              {tabs.map((item, index) => {
                return (
                  <Block key="*this">
                    <View
                      id={index}
                      className={
                        'weui-navbar__item ' +
                        (activeIndex == index ? 'weui-bar__item_on' : '')
                      }
                      onClick={this.tabClick}
                    >
                      <View className="weui-navbar__title">{item}</View>
                    </View>
                  </Block>
                )
              })}
            </View>
            <View className="weui-tab__panel">
              <View className="weui-tab__content" hidden={activeIndex != 0}>
                选项一的内容
              </View>
              <View className="weui-tab__content" hidden={activeIndex != 1}>
                选项二的内容
              </View>
              <View className="weui-tab__content" hidden={activeIndex != 2}>
                选项三的内容
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
