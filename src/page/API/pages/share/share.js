import { Block, View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './share.scss'

@withWeapp({
  data: {
    shareData: {
      title: '自定义转发标题',
      desc: '自定义转发描述',
      path: '/page/API/pages/share/share'
    }
  },

  onShareAppMessage() {
    return this.data.shareData
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '转发'
  }

  render() {
    const { shareData } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'onShareAppMessage' }}></HeadTmpl>
        <View className="page-body">
          <View className="weui-cells__title">
            发送内容（以下字段可自由适配）
          </View>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">标题</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  disabled={true}
                  value={shareData.title}
                ></Input>
              </View>
            </View>
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">描述</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  disabled={true}
                  value={shareData.desc}
                ></Input>
              </View>
            </View>
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">跳转页面</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  disabled={true}
                  value={shareData.path}
                ></Input>
              </View>
            </View>
          </View>
          <View className="weui-cells__tips">点击右上角菜单转发给好友</View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
