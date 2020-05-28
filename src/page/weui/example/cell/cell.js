import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpSlideview from '../../components/slideview/slideview'
import MpCell from '../../components/cell/cell'
import MpCells from '../../components/cells/cells'
import './cell.scss'
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
    const { slideButtons, icon } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Cell</View>
          <View className="page__desc">列表</View>
        </View>
        <View className="page__bd">
          <MpCells extClass="my-cells" title="带说明的列表项">
            <MpCell value="标题文字" footer="说明文字"></MpCell>
            <MpCell
              renderFooter={
                <Block>
                  <View>说明文字</View>
                </Block>
              }
            >
              <View>标题文字（使用slot）</View>
            </MpCell>
            <MpSlideview
              show={true}
              buttons={slideButtons}
              onButtontap={this.slideButtonTap}
            >
              <MpCell value="左滑可以删除" footer="说明文字"></MpCell>
            </MpSlideview>
          </MpCells>
          <MpCells title="带图标、说明的列表项" footer="底部说明文字">
            <MpCell
              value="标题文字"
              footer="说明文字"
              renderIcon={
                <Block>
                  <Image
                    src={icon}
                    style="margin-right: 16px;vertical-align: middle;width:20px; height: 20px;"
                  ></Image>
                </Block>
              }
            ></MpCell>
            <MpCell
              value="标题文字"
              footer="说明文字"
              renderIcon={
                <Block>
                  <Image
                    src={icon}
                    style="margin-right: 16px;vertical-align: middle;width:20px; height: 20px;"
                  ></Image>
                </Block>
              }
            ></MpCell>
          </MpCells>
          <MpCells title="带跳转的列表项">
            <MpCell
              link
              hover
              value="有hover效果"
              footer="说明文字"
              renderTitle={
                <Block>
                  <Image
                    src={icon}
                    style="margin-right: 16px;vertical-align: middle;width:20px; height: 20px;"
                  ></Image>
                </Block>
              }
            ></MpCell>
            <MpCell
              link
              value="无hover效果"
              footer="说明文字"
              renderIcon={
                <Block>
                  <Image
                    src={icon}
                    style="margin-right: 16px;vertical-align: middle;width:20px; height: 20px;"
                  ></Image>
                </Block>
              }
            ></MpCell>
            <MpCell
              link
              url="../index"
              value="无hover效果，带跳转URL"
              footer="说明文字"
              renderIcon={
                <Block>
                  <Image
                    src={icon}
                    style="margin-right: 16px;vertical-align: middle;width:20px; height: 20px;"
                  ></Image>
                </Block>
              }
            ></MpCell>
          </MpCells>
        </View>
      </View>
    )
  }
}

export default _C
