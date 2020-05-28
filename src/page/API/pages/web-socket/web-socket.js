import { Block, View, Switch, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './web-socket.scss'
function showModal(title, content) {
  Taro.showModal({
    title,
    content,
    showCancel: false
  })
}

function showSuccess(title) {
  Taro.showToast({
    title,
    icon: 'success',
    duration: 1000
  })
}

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'Web Socket',
      path: 'page/API/pages/web-socket/web-socket'
    }
  },

  data: {
    socketStatus: 'closed'
  },

  onLoad() {
    const self = this
    self.setData({
      hasLogin: true
    })
    // qcloud.setLoginUrl(loginUrl)

    // qcloud.login({
    //   success: function(result) {
    //     console.log('登录成功', result)
    //     self.setData({
    //       hasLogin: true
    //     })
    //   },

    //   fail: function(error) {
    //     console.log('登录失败', error)
    //   }
    // })
  },

  onUnload() {
    this.closeSocket()
  },

  toggleSocket(e) {
    const turnedOn = e.detail.value

    if (turnedOn && this.data.socketStatus === 'closed') {
      this.openSocket()
    } else if (!turnedOn && this.data.socketStatus === 'connected') {
      const showSuccess = true
      this.closeSocket(showSuccess)
    }
  },

  openSocket() {
    // var socket = this.socket = new qcloud.Tunnel(tunnelUrl)

    Taro.onSocketOpen(() => {
      console.log('WebSocket 已连接')
      showSuccess('Socket已连接')
      this.setData({
        socketStatus: 'connected',
        waitingResponse: false
      })
    })

    Taro.onSocketClose(() => {
      console.log('WebSocket 已断开')
      this.setData({ socketStatus: 'closed' })
    })

    Taro.onSocketError(error => {
      showModal('发生错误', JSON.stringify(error))
      console.error('socket error:', error)
      this.setData({
        loading: false
      })
    })

    // 监听服务器推送消息
    Taro.onSocketMessage(message => {
      showSuccess('收到信道消息')
      console.log('socket message:', message)
      this.setData({
        loading: false
      })
    })

    // 打开信道
    Taro.connectSocket({
      url: 'wss://echo.websocket.org'
    })
  },

  closeSocket() {
    if (this.data.socketStatus === 'connected') {
      Taro.closeSocket({
        success: () => {
          showSuccess('Socket已断开')
          this.setData({ socketStatus: 'closed' })
        }
      })
    }
  },

  sendMessage() {
    if (this.data.socketStatus === 'connected') {
      Taro.sendSocketMessage({
        data: 'Hello, Miniprogram!'
      })
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'Web Socket'
  }

  render() {
    const { hasLogin, socketStatus, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'WebSocket' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_switch">
                <View className="weui-cell__bd">Socket状态</View>
                <View className="weui-cell__ft">
                  <Switch
                    onChange={this.toggleSocket}
                    disabled={!hasLogin}
                  ></Switch>
                </View>
              </View>
              <View className="weui-cell">
                <View className="weui-cell__bd">消息</View>
                <View className="weui-cell__ft">Hello, 小程序!</View>
              </View>
            </View>
          </View>
          <View className="btn-area">
            <Button
              type="primary"
              size="40"
              onClick={this.sendMessage}
              disabled={socketStatus != 'connected'}
              loading={loading}
            >
              点我发送
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
