import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './get-location.scss'
const util = require('../../../../util/util.js')

const formatLocation = util.formatLocation

@withWeapp({
  onShareAppMessage() {
    return {
      title: '获取位置',
      path: 'page/API/pages/get-location/get-location'
    }
  },

  data: {
    hasLocation: false
  },
  getLocation() {
    const that = this
    Taro.getLocation({
      success(res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        })
      }
    })
  },
  clear() {
    this.setData({
      hasLocation: false
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '获取位置'
  }

  render() {
    const { hasLocation, location } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'getLocation' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <Text className="page-body-text-small">当前位置经纬度</Text>
              {hasLocation === false && (
                <Block>
                  <Text className="page-body-text">未获取</Text>
                </Block>
              )}
              {hasLocation === true && (
                <Block>
                  <View className="page-body-text-location">
                    <Text>
                      {'E: ' +
                        location.longitude[0] +
                        '°' +
                        location.longitude[1] +
                        '′'}
                    </Text>
                    <Text>
                      {'N: ' +
                        location.latitude[0] +
                        '°' +
                        location.latitude[1] +
                        '′'}
                    </Text>
                  </View>
                </Block>
              )}
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.getLocation}>
                获取位置
              </Button>
              <Button onClick={this.clear}>清空</Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
