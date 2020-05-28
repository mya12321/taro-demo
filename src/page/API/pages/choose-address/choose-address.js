import { Block, View, Form, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './choose-address.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '收货地址',
      path: 'page/API/pages/choose-address/choose-address'
    }
  },

  data: {
    addressInfo: null
  },
  chooseAddress() {
    Taro.chooseAddress({
      success: res => {
        this.setData({
          addressInfo: res
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '收货地址'
  }

  render() {
    const { addressInfo } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'chooseAddress' }}></HeadTmpl>
        <Form>
          <View className="page-section">
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">收货人姓名</View>
                </View>
                <View className="weui-cell__bd">{addressInfo.userName}</View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">邮编</View>
                </View>
                <View className="weui-cell__bd">{addressInfo.postalCode}</View>
              </View>
              <View className="weui-cell weui-cell_input region">
                <View className="weui-cell__hd">
                  <View className="weui-label">地区</View>
                </View>
                <View className="weui-cell__bd">
                  {addressInfo.provinceName +
                    ' ' +
                    addressInfo.cityName +
                    ' ' +
                    addressInfo.countyName}
                </View>
              </View>
              <View className="weui-cell weui-cell_input detail">
                <View className="weui-cell__hd">
                  <View className="weui-label">收货地址</View>
                </View>
                <View className="weui-cell__bd">{addressInfo.detailInfo}</View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">国家码</View>
                </View>
                <View className="weui-cell__bd">
                  {addressInfo.nationalCode}
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">手机号码</View>
                </View>
                <View className="weui-cell__bd">{addressInfo.telNumber}</View>
              </View>
            </View>
          </View>
        </Form>
        <View className="page-body">
          <View className="btn-area">
            <Button type="primary" onClick={this.chooseAddress}>
              获取收货地址
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
