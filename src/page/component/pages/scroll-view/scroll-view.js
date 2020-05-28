import { Block, View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './scroll-view.scss'
const order = ['demo1', 'demo2', 'demo3']

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },

  data: {
    toView: 'green'
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'scroll-view'
  }

  render() {
    const { toView, scrollTop } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'scroll-view' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-section-title">
              <Text>Vertical Scroll\n纵向滚动</Text>
            </View>
            <View className="page-section-spacing">
              <ScrollView
                scrollY="true"
                style="height: 300rpx;"
                onScrollToUpper={this.upper}
                onScrollToLower={this.lower}
                onScroll={this.scroll}
                scrollIntoView={toView}
                scrollTop={scrollTop}
              >
                <View
                  id="demo1"
                  className="scroll-view-item demo-text-1"
                ></View>
                <View
                  id="demo2"
                  className="scroll-view-item demo-text-2"
                ></View>
                <View
                  id="demo3"
                  className="scroll-view-item demo-text-3"
                ></View>
              </ScrollView>
            </View>
          </View>
          <View className="page-section">
            <View className="page-section-title">
              <Text>Horizontal Scroll\n横向滚动</Text>
            </View>
            <View className="page-section-spacing">
              <ScrollView
                className="scroll-view_H"
                scrollX="true"
                onScroll={this.scroll}
                style="width: 100%"
              >
                <View
                  id="demo1"
                  className="scroll-view-item_H demo-text-1"
                ></View>
                <View
                  id="demo2"
                  className="scroll-view-item_H demo-text-2"
                ></View>
                <View
                  id="demo3"
                  className="scroll-view-item_H demo-text-3"
                ></View>
              </ScrollView>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
