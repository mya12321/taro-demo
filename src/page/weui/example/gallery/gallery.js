import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpGallery from '../../components/gallery/gallery'
import './gallery.scss'

@withWeapp({
  data: {
    imgUrls: [
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg'
    ],
    show: true
  },
  change(e) {
    console.log('current index has changed', e.detail)
  },
  delete(e) {
    console.log('delete', e.detail)
  },
  hide() {
    console.log('component hide')
    setTimeout(() => {
      console.log('component show')
      this.setData({
        show: true
      })
    }, 1000)
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { show, imgUrls } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Gallery</View>
          <View className="page__desc">
            画廊，类似原生的wx.previewImage的展示。
          </View>
        </View>
        <MpGallery
          show={show}
          onChange={this.change}
          onDelete={this.delete}
          onHide={this.hide}
          imgUrls={imgUrls}
          delete
          hideOnClick={true}
          current="1"
        ></MpGallery>
      </View>
    )
  }
}

export default _C
