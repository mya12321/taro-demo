import { Block, View, Picker, Video } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './video.scss'
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const camera = [['front'], ['back'], ['front', 'back']]

// eslint-disable-next-line
const duration = Array.apply(null, { length: 60 }).map(function(n, i) {
  return i + 1
})

@withWeapp({
  onShareAppMessage() {
    return {
      title: '拍摄/选择视频',
      path: 'page/API/pages/video/video'
    }
  },

  data: {
    sourceTypeIndex: 2,
    sourceType: ['拍摄', '相册', '拍摄或相册'],

    cameraIndex: 2,
    camera: ['前置', '后置', '前置或后置'],

    durationIndex: 59,
    duration: duration.map(function(t) {
      return t + '秒'
    }),

    src: ''
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  cameraChange(e) {
    this.setData({
      cameraIndex: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      durationIndex: e.detail.value
    })
  },
  chooseVideo() {
    const that = this
    Taro.chooseVideo({
      sourceType: sourceType[this.data.sourceTypeIndex],
      camera: camera[this.data.cameraIndex],
      maxDuration: duration[this.data.durationIndex],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '拍摄/选择视频'
  }

  render() {
    const {
      sourceType,
      sourceTypeIndex,
      camera,
      cameraIndex,
      duration,
      durationIndex,
      src
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'chooseVideo' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">视频来源</View>
                </View>
                <View className="weui-cell__bd">
                  <Picker
                    range={sourceType}
                    onChange={this.sourceTypeChange}
                    value={sourceTypeIndex}
                  >
                    <View className="weui-input">
                      {sourceType[sourceTypeIndex]}
                    </View>
                  </Picker>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">摄像头</View>
                </View>
                <View className="weui-cell__bd">
                  <Picker
                    range={camera}
                    onChange={this.cameraChange}
                    value={cameraIndex}
                  >
                    <View className="weui-input">{camera[cameraIndex]}</View>
                  </Picker>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">拍摄长度</View>
                </View>
                <View className="weui-cell__bd">
                  <Picker
                    range={duration}
                    onChange={this.durationChange}
                    value={durationIndex}
                  >
                    <View className="weui-input">
                      {duration[durationIndex]}
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
            <View className="page-body-info">
              {src === '' && (
                <Block>
                  <View
                    className="image-plus image-plus-nb"
                    onClick={this.chooseVideo}
                  >
                    <View className="image-plus-horizontal"></View>
                    <View className="image-plus-vertical"></View>
                  </View>
                  <View className="image-plus-text">添加视频</View>
                </Block>
              )}
              {src != '' && (
                <Block>
                  <Video src={src} className="video"></Video>
                </Block>
              )}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
