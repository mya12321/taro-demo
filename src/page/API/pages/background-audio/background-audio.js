import { Block, View, Text, Slider, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './background-audio.scss'
const app = Taro.getApp()
const util = require('../../../../util/util.js')

const dataUrl =
  'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '背景音乐',
      path: 'page/API/pages/background-audio/background-audio'
    }
  },

  onLoad() {
    this._enableInterval()

    if (app.globalData.backgroundAudioPlaying) {
      this.setData({
        playing: true
      })
    }
  },
  data: {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
  },
  play() {
    const that = this
    Taro.playBackgroundAudio({
      dataUrl,
      title: '此时此刻',
      coverImgUrl:
        'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      complete() {
        that.setData({
          playing: true
        })
      }
    })
    this._enableInterval()
    app.globalData.backgroundAudioPlaying = true
  },
  seek(e) {
    clearInterval(this.updateInterval)
    const that = this
    Taro.seekBackgroundAudio({
      position: e.detail.value,
      complete() {
        // 实际会延迟两秒左右才跳过去
        setTimeout(function() {
          that._enableInterval()
        }, 2000)
      }
    })
  },
  pause() {
    const that = this
    Taro.pauseBackgroundAudio({
      dataUrl,
      success() {
        that.setData({
          playing: false
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },
  stop() {
    const that = this
    Taro.stopBackgroundAudio({
      dataUrl,
      success() {
        that.setData({
          playing: false,
          playTime: 0,
          formatedPlayTime: util.formatTime(0)
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },
  _enableInterval() {
    const that = this
    function update() {
      Taro.getBackgroundAudioPlayerState({
        success(res) {
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition + 1)
          })
        }
      })
    }

    update()
    this.updateInterval = setInterval(update, 500)
  },
  onUnload() {
    clearInterval(this.updateInterval)
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '背景音乐'
  }

  render() {
    const { formatedPlayTime, playTime, playing } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'backgroundAudio' }}></HeadTmpl>
        <View className="page-section">
          <View className="page-body-info">
            <Text className="time-big">{formatedPlayTime}</Text>
            <Slider
              className="slider"
              min="0"
              max="269"
              step="1"
              value={playTime}
              onChange={this.seek}
            ></Slider>
            <View className="play-time">
              <Text>00:00</Text>
              <Text>04:29</Text>
            </View>
          </View>
          <View className="page-body-text tc">
            注意：离开当前页面后背景音乐将保持播放，但退出小程序将停止
          </View>
          <View className="page-body-buttons">
            {playing === true && (
              <Block>
                <View className="page-body-button" onClick={this.stop}>
                  <Image src={require('../../../../image/stop.png')}></Image>
                </View>
                <View className="page-body-button" onClick={this.pause}>
                  <Image src={require('../../../../image/pause.png')}></Image>
                </View>
              </Block>
            )}
            {playing === false && (
              <Block>
                <View className="page-body-button"></View>
                <View className="page-body-button" onClick={this.play}>
                  <Image src={require('../../../../image/play.png')}></Image>
                </View>
              </Block>
            )}
            <View className="page-body-button"></View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
