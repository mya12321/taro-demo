import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '振动',
      path: 'page/API/pages/vibrate/vibrate'
    }
  },

  vibrateShort() {
    Taro.vibrateShort({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
      complete() {
        console.log('completed')
      }
    })
  },

  vibrateLong() {
    Taro.vibrateLong({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
      complete() {
        console.log('completed')
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '振动'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'vibrate/Long/Short' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="btn-area">
              <Button type="primary" onClick={this.vibrateLong}>
                长振动
              </Button>
              <Button type="default" onClick={this.vibrateShort}>
                短振动
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
