import {
  Block,
  View,
  Camera,
  Button,
  Navigator,
  Image,
  Video
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './camera.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'camera',
      path: 'page/component/pages/camera/camera'
    }
  },

  data: {
    src: '',
    videoSrc: '',
    position: 'back',
    mode: 'scanCode',
    result: {}
  },
  onLoad() {
    this.ctx = Taro.createCameraContext()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: res => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  startRecord() {
    this.ctx.startRecord({
      success: () => {
        console.log('startRecord')
      }
    })
  },
  stopRecord() {
    this.ctx.stopRecord({
      success: res => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
      }
    })
  },
  togglePosition() {
    this.setData({
      position: this.data.position === 'front' ? 'back' : 'front'
    })
  },
  error(e) {
    console.log(e.detail)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'camera'
  }

  render() {
    const { position, src, videoSrc } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'camera' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-body-wrapper">
            <Camera
              flash="off"
              devicePosition={position}
              onError={this.error}
            ></Camera>
            <View className="btn-area first-btn">
              <Button type="primary" onClick={this.togglePosition}>
                切换摄像头
              </Button>
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.takePhoto}>
                拍照
              </Button>
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.startRecord}>
                开始录像
              </Button>
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.stopRecord}>
                结束录像
              </Button>
            </View>
            <View className="btn-area">
              <Navigator url="/page/component/pages/camera-scan-code/camera-scan-code">
                <Button type="primary">扫描一维码</Button>
              </Navigator>
            </View>
            <View className="preview-tips">预览</View>
            {src && <Image mode="widthFix" className="photo" src={src}></Image>}
            {videoSrc && <Video className="video" src={videoSrc}></Video>}
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
