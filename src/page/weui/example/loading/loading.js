import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpLoading from '../../components/loading/loading'
import './loading.scss'

@withWeapp({
  data: {
    tips: '请稍后',
    show: true,
    animated: true
  },
  onShow() {
    this.timer = setInterval(() => {
      this.setData({
        show: !this.data.show
      })
    }, 2000)
  },
  close() {
    this.setData({
      animated: !this.data.animated
    })
  },
  onUnload() {
    clearInterval(this.timer)
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { show, animated } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Loading</View>
          <View className="page__desc">加载中</View>
        </View>
        <View className="page__bd">
          <MpLoading type="circle"></MpLoading>
          {/*  <mp-loading type="circle" tips="{{tips}}"></mp-loading>  */}
          <MpLoading
            duration={900}
            extClass="demo0"
            type="dot-gray"
            show={show}
            animated={animated}
          ></MpLoading>
          <MpLoading type="dot-white" extClass="demo1"></MpLoading>
        </View>
      </View>
    )
  }
}

export default _C
