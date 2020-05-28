import { Block, View, Form, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './template-message.scss'
const templateMessageUrl = require('../../../../config.js').templateMessageUrl

const app = Taro.getApp()

const formData = {
  address: 'T.I.T 造舰厂',
  time: '2017.01.09',
  name: '帝国歼星舰',
  serial: '123456789'
}

@withWeapp({
  onShareAppMessage() {
    return {
      title: '模板消息',
      path: 'page/API/pages/template-message/template-message'
    }
  },

  onLoad() {
    this.setData({
      formData
    })
  },

  submitForm(e) {
    const self = this
    const { formId } = e.detail
    const formData = e.detail.value

    console.log('form_id is:', formId)

    self.setData({
      loading: true
    })

    app.getUserOpenId(function(err, openid) {
      if (!err) {
        Taro.request({
          url: templateMessageUrl,
          method: 'POST',
          data: {
            form_id: formId,
            openid,
            formData
          },
          success(res) {
            console.log('submit form success', res)
            Taro.showToast({
              title: '发送成功',
              icon: 'success'
            })
            self.setData({
              loading: false
            })
          },
          fail({ errMsg }) {
            console.log('submit form fail, errMsg is:', errMsg)
          }
        })
      } else {
        console.log('err:', err)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '模板消息'
  }

  render() {
    const { formData, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'templateMessage' }}></HeadTmpl>
        <Form
          className="page-body"
          onSubmit={this.submitForm}
          reportSubmit="true"
        >
          <View className="weui-cells__title">点击提交，发送示例模板消息</View>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">示例地点</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  disabled={true}
                  value={formData.address}
                  name="address"
                ></Input>
              </View>
            </View>
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">示例时间</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  disabled={true}
                  value={formData.time}
                  name="time"
                ></Input>
              </View>
            </View>
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">示例物品</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  disabled={true}
                  value={formData.name}
                  name="name"
                ></Input>
              </View>
            </View>
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">示例单号</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  disabled={true}
                  value={formData.serial}
                  name="serial"
                ></Input>
              </View>
            </View>
          </View>
          <View className="btn-area">
            <Button
              type="primary"
              size="40"
              formType="submit"
              loading={loading}
            >
              点我提交
            </Button>
          </View>
        </Form>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
