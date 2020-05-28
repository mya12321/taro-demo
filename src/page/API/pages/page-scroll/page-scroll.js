import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './page-scroll.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '页面滚动',
      path: 'page/API/pages/page-scroll/page-scroll'
    }
  },

  scrollToTop() {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  scrollToBottom() {
    Taro.pageScrollTo({
      scrollTop: 3000,
      duration: 300
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '页面滚动'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'pageScrollTo' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="btn-area">
              <Button type="primary" onClick={this.scrollToBottom}>
                滚动到页面底部
              </Button>
            </View>
            <View className="filling-area"></View>
            <View className="btn-area">
              <Button type="primary" onClick={this.scrollToTop}>
                返回顶部
              </Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
