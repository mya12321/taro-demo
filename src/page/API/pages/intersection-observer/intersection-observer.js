import { Block, View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './intersection-observer.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'WXML节点布局相交状态',
      path: 'page/API/pages/intersection-observer/intersection-observer'
    }
  },

  data: {
    appear: false
  },
  onLoad() {
    this._observer = Taro.createIntersectionObserver(this)
    this._observer.relativeTo('.scroll-view').observe('.ball', res => {
      console.log(res)
      this.setData({
        appear: res.intersectionRatio > 0
      })
    })
  },
  onUnload() {
    if (this._observer) this._observer.disconnect()
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'WXML节点布局相交状态'
  }

  render() {
    const { appear } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'intersectionObserver' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section message">
            {appear ? <Text>小球出现</Text> : <Text>小球消失</Text>}
          </View>
          <View className="page-section">
            <ScrollView className="scroll-view" scrollY>
              <View
                className="scroll-area"
                style={appear ? 'background: #ccc' : ''}
              >
                <Text className="notice">向下滚动让小球出现</Text>
                <View className="filling"></View>
                <View className="ball"></View>
              </View>
            </ScrollView>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
