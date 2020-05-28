import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
const requestUrl = require('../../../../config.js').requestUrl

const duration = 2000

@withWeapp({
  onShareAppMessage() {
    return {
      title: '网络请求',
      path: 'page/API/pages/request/request'
    }
  },

  makeRequest() {
    const self = this

    self.setData({
      loading: true
    })

    Taro.request({
      url: requestUrl,
      data: {
        noncestr: Date.now()
      },
      success(result) {
        Taro.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration
        })
        self.setData({
          loading: false
        })
        console.log('request success', result)
      },

      fail({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '网络请求'
  }

  render() {
    const { buttonDisabled, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'request' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-wording">
            <Text className="page-body-text">点击向服务器发起请求</Text>
          </View>
          <View className="btn-area">
            <Button
              onClick={this.makeRequest}
              type="primary"
              disabled={buttonDisabled}
              loading={loading}
            >
              request
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
