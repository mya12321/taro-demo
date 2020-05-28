import { Block, View, Video, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './video.scss'
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'video',
      path: 'page/component/pages/video/video'
    }
  },

  onReady() {
    this.videoContext = Taro.createVideoContext('myVideo')
  },

  inputValue: '',
  data: {
    src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ]
  },

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },

  bindButtonTap() {
    const that = this
    Taro.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'video'
  }

  render() {
    const { danmuList } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'video' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section tc">
            <Video
              id="myVideo"
              src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
              onError={this.videoErrorCallback}
              danmuList={danmuList}
              enableDanmu
              danmuBtn
              showCenterPlayBtn={false}
              showPlayBtn={true}
              controls
            ></Video>
            <View className="weui-cells">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">弹幕内容</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    onBlur={this.bindInputBlur}
                    className="weui-input"
                    type="text"
                    placeholder="在此处输入弹幕内容"
                  ></Input>
                </View>
              </View>
            </View>
            <View className="btn-area">
              <Button
                onClick={this.bindSendDanmu}
                className="page-body-button"
                type="primary"
                formType="submit"
              >
                发送弹幕
              </Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
