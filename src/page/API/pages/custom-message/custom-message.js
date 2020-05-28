import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './custom-message.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '客服消息',
      path: 'page/API/pages/custom-message/custom-message'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '客服消息'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'customMessage' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-wrapper">
            <Text className="page-body-title">
              点击气泡icon打开客服消息界面
            </Text>
            <View className="page-body-line">
              <ContactButton size="40" sessionFrom="weapp"></ContactButton>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
