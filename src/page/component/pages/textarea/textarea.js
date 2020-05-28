import { Block, View, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './textarea.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'textarea',
      path: 'page/component/pages/textarea/textarea'
    }
  },

  data: {
    focus: false
  },

  bindTextAreaBlur(e) {
    console.log(e.detail.value)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'textarea'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'textarea' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-section-title">
              输入区域高度自适应，不会出现滚动条
            </View>
            <View className="textarea-wrp">
              <Textarea onBlur={this.bindTextAreaBlur} autoHeight></Textarea>
            </View>
          </View>
          <View className="page-section">
            <View className="page-section-title">
              这是一个可以自动聚焦的textarea
            </View>
            <View className="textarea-wrp">
              <Textarea autoFocus="true" style="height: 3em"></Textarea>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
