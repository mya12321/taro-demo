import { Block, View, Form, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './choose-invoice-title.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '获取发票抬头',
      path: 'page/API/pages/choose-invoice-title/choose-invoice-title'
    }
  },

  data: {
    type: '',
    title: '',
    taxNumber: '',
    companyAddress: '',
    telephone: '',
    bankName: '',
    bankAccount: ''
  },
  chooseInvoiceTitle() {
    Taro.chooseInvoiceTitle({
      success: res => {
        this.setData({
          type: res.type,
          title: res.title,
          taxNumber: res.taxNumber,
          companyAddress: res.companyAddress,
          telephone: res.telephone,
          bankName: res.bankName,
          bankAccount: res.bankAccount
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '获取发票抬头'
  }

  render() {
    const {
      type,
      title,
      taxNumber,
      companyAddress,
      telephone,
      bankName,
      bankAccount
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'chooseInvoiceTitle' }}></HeadTmpl>
        <View className="page-body">
          <Form>
            <View className="page-section">
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">抬头类型</View>
                  </View>
                  <View className="weui-cell__bd">
                    {type !== '' ? (type === '0' ? '单位' : '个人') : ''}
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">抬头名称</View>
                  </View>
                  <View className="weui-cell__bd">{title}</View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">抬头税号</View>
                  </View>
                  <View className="weui-cell__bd">{taxNumber}</View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">单位地址</View>
                  </View>
                  <View className="weui-cell__bd">{companyAddress}</View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">手机号码</View>
                  </View>
                  <View className="weui-cell__bd">{telephone}</View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">银行名称</View>
                  </View>
                  <View className="weui-cell__bd">{bankName}</View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">银行账号</View>
                  </View>
                  <View className="weui-cell__bd">{bankAccount}</View>
                </View>
              </View>
            </View>
          </Form>
          <View className="btn-area">
            <Button type="primary" onClick={this.chooseInvoiceTitle}>
              获取发票抬头
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
