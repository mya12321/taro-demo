import {
  Block,
  View,
  Input,
  Button,
  ScrollView,
  Text
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './ibeacon.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'iBeacon',
      path: 'page/API/pages/ibeacon/ibeacon'
    }
  },

  data: {
    uuid: '',
    beacons: []
  },

  onUnload() {
    this.stopSearch()
  },

  enterUuid(e) {
    this.setData({
      uuid: e.detail.value
    })
  },

  startSearch() {
    if (this._searching) return
    this._searching = true
    Taro.startBeaconDiscovery({
      uuids: [this.data.uuid],
      success: res => {
        console.log(res)
        Taro.onBeaconUpdate(({ beacons }) => {
          this.setData({
            beacons
          })
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  },

  stopSearch() {
    this._searching = false
    Taro.stopBeaconDiscovery()
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'iBeacon'
  }

  render() {
    const { beacons } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'iBeacon' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells__title">输入iBeacon设备广播的UUID</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <Input className="weui-input" onInput={this.enterUuid}></Input>
              </View>
            </View>
          </View>
          <View className="btn-area">
            <Button type="primary" onClick={this.startSearch}>
              搜索iBeacon
            </Button>
            <Button onClick={this.stopSearch}>停止搜索</Button>
          </View>
          <View className="page-body-info">
            <View className="devices_summary">
              {'已发现 ' + beacons.length + ' 个外围设备：'}
            </View>
            <ScrollView className="device_list" scrollY scrollWithAnimation>
              {beacons.map((item, index) => {
                return (
                  <View
                    key="index"
                    className="device_item"
                    hoverClass="device_item_hover"
                  >
                    <View style="font-size: 16px; color: #333;">
                      {'主ID: ' + item.major}
                      <Text style="font-size: 12px;">
                        {'次ID: ' + item.minor}
                      </Text>
                    </View>
                    <View style="font-size: 10px">
                      {'信号强度: ' + item.rssi + 'dBm'}
                    </View>
                    <View style="font-size: 10px">{'UUID: ' + item.uuid}</View>
                    <View style="font-size: 10px">
                      {'Proximity: ' +
                        item.proximity +
                        ' Accuracy: ' +
                        item.accuracy}
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
