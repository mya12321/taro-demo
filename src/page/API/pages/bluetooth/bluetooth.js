import { Block, View, ScrollView, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import utils from '../../../../imports/utils0.js'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './bluetooth.scss'
function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i
    }
  }
  return -1
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(
    bit
  ) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}

@withWeapp({
  onShareAppMessage() {
    return {
      title: '蓝牙',
      path: 'page/API/pages/bluetooth/bluetooth'
    }
  },

  data: {
    devices: [],
    connected: false,
    chs: []
  },
  onUnload() {
    this.closeBluetoothAdapter()
  },
  openBluetoothAdapter() {
    Taro.openBluetoothAdapter({
      success: res => {
        console.log('openBluetoothAdapter success', res)
        this.startBluetoothDevicesDiscovery()
      },
      fail: res => {
        if (res.errCode === 10001) {
          Taro.showModal({
            title: '错误',
            content: '未找到蓝牙设备, 请打开蓝牙后重试。',
            showCancel: false
          })
          Taro.onBluetoothAdapterStateChange(function(res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },
  getBluetoothAdapterState() {
    Taro.getBluetoothAdapterState({
      success: res => {
        console.log('getBluetoothAdapterState', res)
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery()
        }
      }
    })
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    Taro.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: res => {
        console.log('startBluetoothDevicesDiscovery success', res)
        this.onBluetoothDeviceFound()
      }
    })
  },
  stopBluetoothDevicesDiscovery() {
    Taro.stopBluetoothDevicesDiscovery({
      complete: () => {
        this._discoveryStarted = false
      }
    })
  },
  onBluetoothDeviceFound() {
    Taro.onBluetoothDeviceFound(res => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }
        const foundDevices = this.data.devices
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        const data = {}
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device
        } else {
          data[`devices[${idx}]`] = device
        }
        this.setData(data)
      })
    })
  },
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    const name = ds.name
    Taro.showLoading()
    Taro.createBLEConnection({
      deviceId,
      success: () => {
        this.setData({
          connected: true,
          name,
          deviceId
        })
        this.getBLEDeviceServices(deviceId)
      },
      complete() {
        Taro.hideLoading()
      }
    })
    this.stopBluetoothDevicesDiscovery()
  },
  closeBLEConnection() {
    Taro.closeBLEConnection({
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false
    })
  },
  getBLEDeviceServices(deviceId) {
    Taro.getBLEDeviceServices({
      deviceId,
      success: res => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    Taro.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: res => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          const item = res.characteristics[i]
          if (item.properties.read) {
            Taro.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid
            })
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            this.writeBLECharacteristicValue()
          }
          if (item.properties.notify || item.properties.indicate) {
            Taro.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    // 操作之前先监听，保证第一时间获取数据
    Taro.onBLECharacteristicValueChange(characteristic => {
      const idx = inArray(
        this.data.chs,
        'uuid',
        characteristic.characteristicId
      )
      const data = {}
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      this.setData(data)
    })
  },
  writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    const buffer = new ArrayBuffer(1)
    const dataView = new DataView(buffer)
    // eslint-disable-next-line
    dataView.setUint8(0, (Math.random() * 255) | 0)
    Taro.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._deviceId,
      characteristicId: this._characteristicId,
      value: buffer
    })
  },
  closeBluetoothAdapter() {
    Taro.closeBluetoothAdapter()
    this._discoveryStarted = false
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '蓝牙'
  }

  render() {
    const { devices, name, canWrite, connected, chs } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'bluetooth' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <View className="devices_summary">
                {'已发现 ' + devices.length + ' 个外围设备：'}
              </View>
              <ScrollView className="device_list" scrollY scrollWithAnimation>
                {devices.map((item, index) => {
                  return (
                    <View
                      key="index"
                      data-device-id={item.deviceId}
                      data-name={item.name || item.localName}
                      onClick={this.createBLEConnection}
                      className="device_item"
                      hoverClass="device_item_hover"
                    >
                      <View style="font-size: 16px; color: #333;">
                        {item.name}
                      </View>
                      <View style="font-size: 10px">
                        {'信号强度: ' +
                          item.RSSI +
                          'dBm (' +
                          utils.max(0, item.RSSI + 100) +
                          '%)'}
                      </View>
                      <View style="font-size: 10px">
                        {'UUID: ' + item.deviceId}
                      </View>
                      <View style="font-size: 10px">
                        {'Service数量: ' + utils.len(item.advertisServiceUUIDs)}
                      </View>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.openBluetoothAdapter}>
                开始扫描
              </Button>
              <Button onClick={this.stopBluetoothDevicesDiscovery}>
                停止扫描
              </Button>
            </View>
          </View>
        </View>
        {connected && (
          <View className="connected_info">
            <View>
              <Text>{'已连接到 ' + name}</Text>
              <View className="operation">
                {canWrite && (
                  <Button
                    size="mini"
                    onClick={this.writeBLECharacteristicValue}
                  >
                    写数据
                  </Button>
                )}
                <Button size="mini" onClick={this.closeBLEConnection}>
                  断开连接
                </Button>
              </View>
            </View>
            {chs.map((item, index) => {
              return (
                <View key="index" style="font-size: 12px; margin-top: 10px;">
                  <View>{'特性UUID: ' + item.uuid}</View>
                  <View>{'特性值: ' + item.value}</View>
                </View>
              )
            })}
          </View>
        )}
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
