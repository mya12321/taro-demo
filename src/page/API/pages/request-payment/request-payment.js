import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './request-payment.scss'
const paymentUrl = require('../../../../config.js').paymentUrl

const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '发起支付',
      path: 'page/API/pages/request-payment/request-payment'
    }
  },

  onLoad() {},

  requestPayment() {
    const self = this

    self.setData({
      loading: true
    })

    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    app.getUserOpenId(function(err, openid) {
      if (!err) {
        Taro.request({
          url: paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success(res) {
            console.log('unified order success, response is:', res)
            const payargs = res.data.payargs
            Taro.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })

            self.setData({
              loading: false
            })
          }
        })
      } else {
        console.log('err:', err)
        self.setData({
          loading: false
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '发起支付'
  }

  render() {
    const { loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'requestPayment' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View>支付金额</View>
            <View className="price">0.01</View>
            <View className="desc">实际接口应用中可自定义金额</View>
            <View className="btn-area">
              <Button
                type="primary"
                onClick={this.requestPayment}
                loading={loading}
              >
                支付
              </Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
