import { Block, View, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './preview.scss'

@withWeapp({})
class _C extends Taro.Component {
  config = {}

  render() {
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Preview</View>
          <View className="page__desc">表单预览</View>
        </View>
        <View className="page__bd">
          <View className="weui-form-preview">
            <View className="weui-form-preview__hd">
              <View className="weui-form-preview__item">
                <View className="weui-form-preview__label">付款金额</View>
                <View className="weui-form-preview__value_in-hd">¥2400.00</View>
              </View>
            </View>
            <View className="weui-form-preview__bd">
              <View className="weui-form-preview__item">
                <View className="weui-form-preview__label">商品</View>
                <View className="weui-form-preview__value">电动打蛋机</View>
              </View>
              <View className="weui-form-preview__item">
                <View className="weui-form-preview__label">标题标题</View>
                <View className="weui-form-preview__value">名字名字名字</View>
              </View>
              <View className="weui-form-preview__item">
                <View className="weui-form-preview__label">标题标题</View>
                <View className="weui-form-preview__value">
                  很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字
                </View>
              </View>
            </View>
            <View className="weui-form-preview__ft">
              <Navigator
                url
                className="weui-form-preview__btn weui-form-preview__btn_primary"
                hoverClass="weui-form-preview__btn_active"
              >
                操作
              </Navigator>
            </View>
          </View>
          <View className="weui-form-preview">
            <View className="weui-form-preview__hd">
              <View className="weui-form-preview__label">付款金额</View>
              <View className="weui-form-preview__value_in-hd">¥2400.00</View>
            </View>
            <View className="weui-form-preview__bd">
              <View className="weui-form-preview__item">
                <View className="weui-form-preview__label">商品</View>
                <View className="weui-form-preview__value">电动打蛋机</View>
              </View>
              <View className="weui-form-preview__item">
                <View className="weui-form-preview__label">标题标题</View>
                <View className="weui-form-preview__value">名字名字名字</View>
              </View>
              <View className="weui-form-preview__item">
                <View className="weui-form-preview__label">标题标题</View>
                <View className="weui-form-preview__value">
                  很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字
                </View>
              </View>
            </View>
            <View className="weui-form-preview__ft">
              <Navigator
                className="weui-form-preview__btn weui-form-preview__btn_default"
                hoverClass="weui-form-preview__btn_active"
              >
                辅助操作
              </Navigator>
              <Navigator
                className="weui-form-preview__btn weui-form-preview__btn_primary"
                hoverClass="weui-form-preview__btn_active"
              >
                操作
              </Navigator>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
