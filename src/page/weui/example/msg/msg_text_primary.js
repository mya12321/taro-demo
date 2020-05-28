import { Block, View, Icon, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpMsg from '../../components/msg/msg'
import './msg_text_primary.scss'

@withWeapp({})
class _C extends Taro.Component {
  config = {}

  render() {
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Msg</View>
          <View className="page__desc">提示页</View>
        </View>
        <View className="page__bd">
          <View className="weui-btn-area">
            <Button
              className="weui-btn"
              type="default"
              onClick={this.openSuccess}
            >
              成功提示页
            </Button>
            <Button className="weui-btn" type="default" onClick={this.openFail}>
              失败提示页
            </Button>
            <Button className="weui-btn" type="default" onClick={this.openText}>
              无图标提示页
            </Button>
            <Button
              className="weui-btn"
              type="default"
              onClick={this.openTextPrimary}
            >
              无图标提示页
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
