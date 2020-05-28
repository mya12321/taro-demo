import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './image.scss'
const config = require('../../../../config.js')

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'image',
      path: 'page/component/pages/image/image'
    }
  },
  data: {
    imageUrl: config.downloadExampleUrl
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'image'
  }

  render() {
    const { imageUrl } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'image' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="page-section-title">Local Image</View>
            <View className="page-section-ctn">
              <Image
                className="image"
                src={require('../../resources/pic/1.jpg')}
              ></Image>
            </View>
          </View>
          <View className="page-section page-section-gap">
            <View className="page-section-title">Internet Image</View>
            <View className="page-section-ctn">
              <Image className="image" src={imageUrl}></Image>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
