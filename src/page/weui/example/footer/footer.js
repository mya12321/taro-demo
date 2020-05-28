import { Block, View, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './footer.scss'

@withWeapp({})
class _C extends Taro.Component {
  config = {}

  render() {
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Footer</View>
          <View className="page__desc">页脚</View>
        </View>
        <View className="page__bd page__bd_spacing">
          <View className="weui-footer">
            <View className="weui-footer__text">
              Copyright © 2008-2016 weui.io
            </View>
          </View>
          <View className="weui-footer">
            <View className="weui-footer__links">
              <Navigator url className="weui-footer__link">
                底部链接
              </Navigator>
            </View>
            <View className="weui-footer__text">
              Copyright © 2008-2016 weui.io
            </View>
          </View>
          <View className="weui-footer">
            <View className="weui-footer__links">
              <Navigator url className="weui-footer__link">
                底部链接
              </Navigator>
              <Navigator url className="weui-footer__link">
                底部链接
              </Navigator>
            </View>
            <View className="weui-footer__text">
              Copyright © 2008-2016 weui.io
            </View>
          </View>
          <View className="weui-footer weui-footer_fixed-bottom">
            <View className="weui-footer__links">
              <Navigator url className="weui-footer__link">
                WeUI首页
              </Navigator>
            </View>
            <View className="weui-footer__text">
              Copyright © 2008-2016 weui.io
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
