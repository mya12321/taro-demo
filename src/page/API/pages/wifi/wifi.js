import { Block, View, ScrollView, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './wifi.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'Wi-Fi',
      path: 'page/API/pages/wifi/wifi'
    }
  },

  data: {
    wifiList: []
  },

  onUnload() {
    this.stopSearch()
  },

  startSearch() {
    const getWifiList = () => {
      Taro.getWifiList({
        success: () => {
          Taro.onGetWifiList(res => {
            const wifiList = res.wifiList
              .sort((a, b) => b.signalStrength - a.signalStrength)
              .map(wifi => {
                const strength = Math.ceil(wifi.signalStrength * 4)
                return Object.assign(wifi, { strength })
              })
            this.setData({
              wifiList
            })
          })
        },
        fail(err) {
          console.error(err)
        }
      })
    }

    const startWifi = () => {
      Taro.startWifi({
        success: getWifiList,
        fail(err) {
          console.error(err)
        }
      })
    }

    Taro.getSystemInfo({
      success(res) {
        const isIOS = res.platform === 'ios'
        if (isIOS) {
          Taro.showModal({
            title: '提示',
            content:
              '由于系统限制，iOS用户请手动进入系统WiFi页面，然后返回小程序。',
            showCancel: false,
            success() {
              startWifi()
            }
          })
          return
        }
        startWifi()
      }
    })
  },

  stopSearch() {
    Taro.stopWifi({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'Wi-Fi'
  }

  render() {
    const { wifiList } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'Wi-Fi' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-info">
            <ScrollView className="device-list" scrollY>
              {wifiList.map((item, index) => {
                return (
                  <View className="item" key={index}>
                    <View className="list">
                      <Text>{item.SSID}</Text>
                      <Span className="wifi-icon">
                        <Span className="wifi-1"></Span>
                        <Span
                          className={
                            'wifi-2 ' + (item.strength < 2 ? 'off' : '')
                          }
                        ></Span>
                        <Span
                          className={
                            'wifi-3 ' + (item.strength < 3 ? 'off' : '')
                          }
                        ></Span>
                        <Span
                          className={
                            'wifi-4 ' + (item.strength < 4 ? 'off' : '')
                          }
                        ></Span>
                        {item.secure && <Span className="lock"></Span>}
                      </Span>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
          <View className="btn-area">
            <Button type="primary" onClick={this.startSearch}>
              搜索Wi-Fi
            </Button>
            <Button onClick={this.stopSearch}>停止搜索</Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
