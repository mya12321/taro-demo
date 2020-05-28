import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './flex.scss'

@withWeapp({})
class _C extends Taro.Component {
  config = {}

  render() {
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Flex</View>
          <View className="page__desc">Flex布局</View>
        </View>
        <View className="page__bd page__bd_spacing">
          <View className="weui-flex">
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
          </View>
          <View className="weui-flex">
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
          </View>
          <View className="weui-flex">
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
          </View>
          <View className="weui-flex">
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
          </View>
          <View className="weui-flex">
            <View>
              <View className="placeholder">weui</View>
            </View>
            <View className="weui-flex__item">
              <View className="placeholder">weui</View>
            </View>
            <View>
              <View className="placeholder">weui</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
