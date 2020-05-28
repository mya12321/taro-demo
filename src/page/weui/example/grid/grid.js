import { Block, View, Navigator, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './grid.scss'

@withWeapp({
  data: {
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { grids } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Grid</View>
          <View className="page__desc">九宫格</View>
        </View>
        <View className="page__bd">
          <View className="weui-grids">
            {grids.map((item, index) => {
              return (
                <Block key="*this">
                  <Navigator
                    url
                    className="weui-grid"
                    hoverClass="weui-grid_active"
                  >
                    <Image
                      className="weui-grid__icon"
                      src={require('../images/icon_tabbar.png')}
                    ></Image>
                    <View className="weui-grid__label">Grid</View>
                  </Navigator>
                </Block>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
