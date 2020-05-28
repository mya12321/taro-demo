import { Block, View, Text, Button, Label, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './share-button.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '转发按钮',
      path: 'page/API/pages/share-button/share-button'
    }
  },
  handleTapShareButton() {
    if (
      !(
        typeof Taro.canIUse === 'function' &&
        Taro.canIUse('button.open-type.share')
      )
    ) {
      Taro.showModal({
        title: '当前版本不支持转发按钮',
        content: '请升级至最新版本微信客户端',
        showCancel: false
      })
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '转发按钮'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'share-button' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-wrapper">
            <Text className="page-body-title">轻触下方图标即可转发</Text>
            <View className="page-body-line">
              <Button
                onClick={this.handleTapShareButton}
                openType="share"
                className="button-share"
                id="share-button"
              ></Button>
              <Label for="share-button">
                <Image
                  style="width: 27px; height: 27px"
                  src={require('../../../../image/share.png')}
                ></Image>
              </Label>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
