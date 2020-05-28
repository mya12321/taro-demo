import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpSlideview from '../../components/slideview/slideview'
import MpCell from '../../components/cell/cell'
import MpCells from '../../components/cells/cells'
import './slideview.scss'
var base64 = require('../images/base64.js')

@withWeapp({
  onLoad: function() {
    this.setData({
      icon: base64.icon20,
      slideButtons: [
        {
          text: '普通',
          src: global.isDemo
            ? '/page/weui/example/cell/icon_love.svg'
            : '/example/cell/icon_love.svg' // icon的路径
        },
        {
          text: '普通',
          extClass: 'test',
          src: global.isDemo
            ? '/page/weui/example/cell/icon_star.svg'
            : '/example/cell/icon_star.svg' // icon的路径
        },
        {
          type: 'warn',
          text: '警示',
          extClass: 'test',
          src: global.isDemo
            ? '/page/weui/example/cell/icon_del.svg'
            : '/example/cell/icon_del.svg' // icon的路径
        }
      ]
    })
  },
  slideButtonTap(e) {
    console.log('slide button tap', e.detail)
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { slideButtons } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Slideview</View>
          <View className="page__desc">左滑操作</View>
        </View>
        <View className="page__bd">
          <View className="weui-cells">
            <MpSlideview
              show={true}
              buttons={slideButtons}
              onButtontap={this.slideButtonTap}
            >
              <MpCell value="左滑可以删除" footer="说明文字"></MpCell>
            </MpSlideview>
          </View>
          <View className="weui-slidecells">
            <MpSlideview
              buttons={slideButtons}
              icon={true}
              onButtontap={this.slideButtonTap}
            >
              <View className="weui-slidecell">左滑可以删除（图标Button）</View>
            </MpSlideview>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
