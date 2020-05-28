import { Block, View, Audio } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './audio.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'audio',
      path: 'page/component/pages/audio/audio'
    }
  },

  data: {
    current: {
      poster:
        'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src:
        'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    },
    audioAction: {
      method: 'pause'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'audio'
  }

  render() {
    const { current, audioAction } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'audio' }}></HeadTmpl>
        <View className="page-body">
          <View
            className="page-section page-section-gap"
            style="text-align: center;"
          >
            <Audio
              style="text-align: left"
              src={current.src}
              poster={current.poster}
              name={current.name}
              author={current.author}
              action={audioAction}
              controls
            ></Audio>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
