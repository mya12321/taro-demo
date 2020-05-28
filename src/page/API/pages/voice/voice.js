import { Block, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './voice.scss'
const util = require('../../../../util/util.js')

let playTimeInterval
let recordTimeInterval

@withWeapp({
  onShareAppMessage() {
    return {
      title: '录音',
      path: 'page/API/pages/voice/voice'
    }
  },

  data: {
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00'
  },

  onHide() {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },

  startRecord() {
    this.setData({ recording: true })

    const that = this
    recordTimeInterval = setInterval(function() {
      const recordTime = (that.data.recordTime += 1)
      that.setData({
        formatedRecordTime: util.formatTime(that.data.recordTime),
        recordTime
      })
    }, 1000)

    Taro.startRecord({
      success(res) {
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime)
        })
      },
      complete() {
        that.setData({ recording: false })
        clearInterval(recordTimeInterval)
      }
    })
  },

  stopRecord() {
    Taro.stopRecord()
  },

  stopRecordUnexpectedly() {
    const that = this
    Taro.stopRecord({
      success() {
        console.log('stop record success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      }
    })
  },

  playVoice() {
    const that = this
    playTimeInterval = setInterval(function() {
      const playTime = that.data.playTime + 1
      console.log('update playTime', playTime)
      that.setData({
        playing: true,
        formatedPlayTime: util.formatTime(playTime),
        playTime
      })
    }, 1000)
    Taro.playVoice({
      filePath: this.data.tempFilePath,
      success() {
        clearInterval(playTimeInterval)
        const playTime = 0
        console.log('play voice finished')
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(playTime),
          playTime
        })
      }
    })
  },

  pauseVoice() {
    clearInterval(playTimeInterval)
    Taro.pauseVoice()
    this.setData({
      playing: false
    })
  },

  stopVoice() {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    })
    Taro.stopVoice()
  },

  clear() {
    clearInterval(playTimeInterval)
    Taro.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '录音'
  }

  render() {
    const {
      formatedRecordTime,
      recording,
      playing,
      hasRecord,
      formatedPlayTime
    } = this.data
    return (
      <View className="container">
        <HeadTmpl
          data={{ title: 'start/stopRecord、play/stopVoice' }}
        ></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            {recording === false && playing === false && hasRecord === false && (
              <Block>
                <View className="page-body-time">
                  <Text className="time-big">{formatedRecordTime}</Text>
                </View>
                <View className="page-body-buttons">
                  <View className="page-body-button"></View>
                  <View className="page-body-button" onClick={this.startRecord}>
                    <Image
                      src={require('../../../../image/record.png')}
                    ></Image>
                  </View>
                  <View className="page-body-button"></View>
                </View>
              </Block>
            )}
            {recording === true && (
              <Block>
                <View className="page-body-time">
                  <Text className="time-big">{formatedRecordTime}</Text>
                </View>
                <View className="page-body-buttons">
                  <View className="page-body-button"></View>
                  <View className="page-body-button" onClick={this.stopRecord}>
                    <View className="button-stop-record"></View>
                  </View>
                  <View className="page-body-button"></View>
                </View>
              </Block>
            )}
            {hasRecord === true && playing === false && (
              <Block>
                <View className="page-body-time">
                  <Text className="time-big">{formatedPlayTime}</Text>
                  <Text className="time-small">{formatedRecordTime}</Text>
                </View>
                <View className="page-body-buttons">
                  <View className="page-body-button"></View>
                  <View className="page-body-button" onClick={this.playVoice}>
                    <Image src={require('../../../../image/play.png')}></Image>
                  </View>
                  <View className="page-body-button" onClick={this.clear}>
                    <Image src={require('../../../../image/trash.png')}></Image>
                  </View>
                </View>
              </Block>
            )}
            {hasRecord === true && playing === true && (
              <Block>
                <View className="page-body-time">
                  <Text className="time-big">{formatedPlayTime}</Text>
                  <Text className="time-small">{formatedRecordTime}</Text>
                </View>
                <View className="page-body-buttons">
                  <View className="page-body-button" onClick={this.stopVoice}>
                    <Image src={require('../../../../image/stop.png')}></Image>
                  </View>
                  {/*  <view class="page-body-button" bindtap="pauseVoice">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     <image src="/image/pause.png"></image>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   </view>  */}
                  <View className="page-body-button" onClick={this.clear}>
                    <Image src={require('../../../../image/trash.png')}></Image>
                  </View>
                </View>
              </Block>
            )}
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
