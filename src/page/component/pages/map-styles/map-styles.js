import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './map-styles.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'map底图样式',
      path: 'page/component/pages/map-styles/map-styles'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'map底图样式'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'map' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">经典</View>
            <View className="page-section-ctn">
              <Image
                className="image"
                src={require('../../resources/pic/custom_map_template_1.png')}
              ></Image>
            </View>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">墨渊</View>
            <View className="page-section-ctn">
              <Image
                className="image"
                src={require('../../resources/pic/custom_map_template_2.png')}
              ></Image>
            </View>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">白浅</View>
            <View className="page-section-ctn">
              <Image
                className="image"
                src={require('../../resources/pic/custom_map_template_3.png')}
              ></Image>
            </View>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">玉露</View>
            <View className="page-section-ctn">
              <Image
                className="image"
                src={require('../../resources/pic/custom_map_template_4.png')}
              ></Image>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
