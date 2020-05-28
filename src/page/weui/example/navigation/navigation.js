import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpNavigationBar from '../../components/navigation-bar/navigation-bar'
import './navigation.scss'

@withWeapp({
  data: {
    loading: false,
    color: '#000',
    background: '#f8f8f8',
    show: true,
    animated: false
  },
  toggleLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },
  changeColor() {
    this.setData({
      color: '#07C160'
    })
  },
  changeBgColor() {
    this.setData({
      background: '#ededed'
    })
  },
  toggleShow() {
    this.setData({
      show: !this.data.show
    })
  },
  toggleAnimated() {
    this.setData({
      animated: !this.data.animated,
      show: !this.data.show
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationStyle: 'custom'
  }

  render() {
    const { loading, show, animated, color, background } = this.data
    return (
      <Block>
        <MpNavigationBar
          loading={loading}
          show={show}
          animated={animated}
          color={color}
          background={background}
          title="UI组件库"
          back={true}
        ></MpNavigationBar>
        <View className="page">
          <View className="page__hd">
            <View className="page__title">Navigation</View>
            <View className="page__desc">小程序自定义导航栏</View>
          </View>
          <View className="page__bd page__bd_spacing">
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.toggleLoading}
            >
              触发loading
            </Button>
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.changeColor}
            >
              修改文字颜色
            </Button>
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.changeBgColor}
            >
              修改背景颜色
            </Button>
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.toggleShow}
            >
              显示 / 隐藏
            </Button>
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.toggleAnimated}
            >
              设置显示 / 隐藏opacity动画
            </Button>
          </View>
        </View>
      </Block>
    )
  }
}

export default _C
