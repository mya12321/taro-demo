import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './load-font-face.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '动态加载字体',
      path: 'page/API/pages/load-font-face/load-font-face'
    }
  },

  data: {
    fontFamily: 'Bitstream Vera Serif Bold',
    loaded: false
  },

  onLoad() {
    this.setData({
      loaded: false
    })
  },

  loadFontFace() {
    const self = this
    Taro.loadFontFace({
      family: this.data.fontFamily,
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success(res) {
        console.log(res.status)
        self.setData({ loaded: true })
      },
      fail(res) {
        console.log(res.status)
      },
      complete(res) {
        console.log(res.status)
      }
    })
  },

  clear() {
    this.setData({ loaded: false })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '动态加载字体'
  }

  render() {
    const { loaded, fontFamily } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'loadFontFace' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View
              className={
                'page-body-info display-area ' + (loaded ? 'font-loaded' : '')
              }
            >
              {!loaded ? (
                <Text>{'Load ' + fontFamily}</Text>
              ) : (
                <Text>{fontFamily + ' is loaded'}</Text>
              )}
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.loadFontFace}>
                加载字体
              </Button>
              <Button type="default" onClick={this.clear}>
                清除
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
