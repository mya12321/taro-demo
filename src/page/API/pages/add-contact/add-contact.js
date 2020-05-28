import { Block, View, Form, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './add-contact.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '新增联系人',
      path: 'page/API/pages/add-contact/add-contact'
    }
  },

  submit(e) {
    const formData = e.detail.value
    Taro.addPhoneContact({
      ...formData,
      success() {
        Taro.showToast({
          title: '联系人创建成功'
        })
      },
      fail() {
        Taro.showToast({
          title: '联系人创建失败'
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '新增联系人'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'addPhoneContact' }}></HeadTmpl>
        <View className="page-body">
          <Form onSubmit={this.submit}>
            <View className="page-section">
              <View className="weui-cells__title">姓氏</View>
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <Input className="weui-input" name="lastName"></Input>
                </View>
              </View>
            </View>
            <View className="page-section">
              <View className="weui-cells__title">名字</View>
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <Input className="weui-input" name="firstName"></Input>
                </View>
              </View>
            </View>
            <View className="page-section">
              <View className="weui-cells__title">手机号</View>
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <Input
                    className="weui-input"
                    name="mobilePhoneNumber"
                  ></Input>
                </View>
              </View>
            </View>
            <View className="btn-area">
              <Button type="primary" formType="submit">
                创建联系人
              </Button>
              <Button type="default" formType="reset">
                重置
              </Button>
            </View>
          </Form>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
