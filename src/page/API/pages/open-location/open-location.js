import { Block, View, Form, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './open-location.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '查看位置',
      path: 'page/API/pages/open-location/open-location'
    }
  },

  openLocation(e) {
    console.log(e)
    const value = e.detail.value
    console.log(value)
    Taro.openLocation({
      longitude: Number(value.longitude),
      latitude: Number(value.latitude),
      name: value.name,
      address: value.address
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '查看位置'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'openLocation' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <Form onSubmit={this.openLocation}>
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">经度</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Input
                      className="weui-input"
                      type="text"
                      disabled={true}
                      value="113.324520"
                      name="longitude"
                    ></Input>
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">纬度</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Input
                      className="weui-input"
                      type="text"
                      disabled={true}
                      value="23.099994"
                      name="latitude"
                    ></Input>
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">位置名称</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Input
                      className="weui-input"
                      type="text"
                      disabled={true}
                      value="T.I.T 创意园"
                      name="name"
                    ></Input>
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">详细位置</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Input
                      className="weui-input"
                      type="text"
                      disabled={true}
                      value="广州市海珠区新港中路397号"
                      name="address"
                    ></Input>
                  </View>
                </View>
              </View>
              <View className="btn-area">
                <Button type="primary" formType="submit">
                  查看位置
                </Button>
              </View>
            </Form>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
