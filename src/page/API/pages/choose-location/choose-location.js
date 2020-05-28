import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './choose-location.scss'
const util = require('../../../../util/util.js')

const formatLocation = util.formatLocation

@withWeapp({
  onShareAppMessage() {
    return {
      title: '使用原生地图选择位置',
      path: 'page/API/pages/choose-location/choose-location'
    }
  },

  data: {
    hasLocation: false
  },
  chooseLocation() {
    const that = this
    Taro.chooseLocation({
      success(res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
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
    navigationBarTitleText: '使用原生地图选择位置'
  }

  render() {
    const { hasLocation, locationAddress, location } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'chooseLocation' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              <Text className="page-body-text-small">当前位置信息</Text>
              {hasLocation === false && (
                <Block>
                  <Text className="page-body-text">未选择位置</Text>
                </Block>
              )}
              {hasLocation === true && (
                <Block>
                  <Text className="page-body-text">{locationAddress}</Text>
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
              <Button type="primary" onClick={this.chooseLocation}>
                选择位置
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
