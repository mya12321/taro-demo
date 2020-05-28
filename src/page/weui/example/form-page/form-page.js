import {
  Block,
  View,
  Label,
  Input,
  Button,
  Navigator
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpFormPage from '../../components/form-page/form-page'
import './form-page.scss'

@withWeapp({
  data: {},
  methods: {}
})
class _C extends Taro.Component {
  config = {
    component: true
  }

  render() {
    return (
      <View className="weui-form">
        <View className="weui-form__text-area">
          <View className="weui-form__title">表单标题</View>
          <View className="weui-form__desc">表单描述示意</View>
        </View>
        <View className="weui-form__control-area">
          <View className="weui-cells__group weui-cells__group_form">
            <View className="weui-cells__title">输入框</View>
            <View className="weui-cells weui-cells_form">
              <View className="weui-cell">
                <View className="weui-cell__hd">
                  <Label className="weui-label">QQ号</Label>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="number"
                    pattern="[0-9]*"
                    placeholder="请输入QQ号"
                  ></Input>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="weui-form__tips-area">
          <Label for="weuiAgree" className="weui-agree">
            <Input
              id="weuiAgree"
              type="checkbox"
              className="weui-agree__checkbox"
            ></Input>
            <Span className="weui-agree__text">
              阅读并同意<A href="javascript:void(0);">《相关条款》</A>
            </Span>
          </Label>
        </View>
        <View className="weui-form__opr-area">
          <Button type="primary">确定</Button>
        </View>
        <View className="weui-form__tips-area">
          <View className="weui-form__tips">
            点击下一步即表示
            <Navigator href="javascript:;">同意用户协议</Navigator>
          </View>
        </View>
        <View className="weui-form__extra-area">
          <View className="weui-footer">
            <View className="weui-footer__links">
              <Navigator
                href="javascript:void(0);"
                className="weui-footer__link"
              >
                底部链接文本
              </Navigator>
            </View>
            <View className="weui-footer__text">
              Copyright © 2008-2019 weui.io
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
