import { Block, View, Map, CoverView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './cover-view.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'cover-view',
      path: 'page/component/pages/cover-view/cover-view'
    }
  },

  data: {
    latitude: 23.099994,
    longitude: 113.32452
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'cover-view'
  }

  render() {
    const { latitude, longitude } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'cover-view' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <Map
              style="width: 100%; height: 300px;"
              latitude={latitude}
              longitude={longitude}
            >
              <CoverView className="cover-view">
                <CoverView className="container">
                  <CoverView className="flex-wrp" style="flex-direction:row;">
                    <CoverView className="flex-item demo-text-1"></CoverView>
                    <CoverView className="flex-item demo-text-2"></CoverView>
                    <CoverView className="flex-item demo-text-3"></CoverView>
                  </CoverView>
                </CoverView>
              </CoverView>
            </Map>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
