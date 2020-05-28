import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
const AUTH_MODE = 'fingerPrint'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '生物认证',
      path: 'page/API/pages/soter-authentication/soter-authentication'
    }
  },

  startAuth() {
    const startSoterAuthentication = () => {
      Taro.startSoterAuthentication({
        requestAuthModes: [AUTH_MODE],
        challenge: 'test',
        authContent: '小程序示例',
        success: () => {
          Taro.showToast({
            title: '认证成功'
          })
        },
        fail: err => {
          console.error(err)
          Taro.showModal({
            title: '失败',
            content: '认证失败',
            showCancel: false
          })
        }
      })
    }

    const checkIsEnrolled = () => {
      Taro.checkIsSoterEnrolledInDevice({
        checkAuthMode: AUTH_MODE,
        success: res => {
          console.log(res)
          if (parseInt(res.isEnrolled, 10) <= 0) {
            Taro.showModal({
              title: '错误',
              content: '您暂未录入指纹信息，请录入后重试',
              showCancel: false
            })
            return
          }
          startSoterAuthentication()
        },
        fail: err => {
          console.error(err)
        }
      })
    }

    const notSupported = () => {
      Taro.showModal({
        title: '错误',
        content: '您的设备不支持指纹识别',
        showCancel: false
      })
    }

    Taro.checkIsSupportSoterAuthentication({
      success: res => {
        console.log(res)
        if (
          !res ||
          res.supportMode.length === 0 ||
          res.supportMode.indexOf('fingerPrint') < 0
        ) {
          notSupported()
          return
        }
        checkIsEnrolled()
      },
      fail: err => {
        console.error(err)
        notSupported()
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '生物认证'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'startSoterAuthentication' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <Button type="primary" onClick={this.startAuth}>
              开始认证
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
