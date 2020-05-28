import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './article.scss'

@withWeapp({})
class _C extends Taro.Component {
  config = {}

  render() {
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Article</View>
          <View className="page__desc">文章</View>
        </View>
        <View className="page__bd">
          <View className="weui-article">
            <View className="weui-article__h1">大标题</View>
            <View className="weui-article__section">
              <View className="weui-article__h2">章标题</View>
              <View className="weui-article__section">
                <View className="weui-article__h3">1.1 节标题</View>
                <View className="weui-article__p">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </View>
                <View className="weui-article__p">
                  <Image
                    className="weui-article__img"
                    src={require('../images/pic_article.png')}
                    mode="aspectFit"
                    style="height: 180px"
                  ></Image>
                  <Image
                    className="weui-article__img"
                    src={require('../images/pic_article.png')}
                    mode="aspectFit"
                    style="height: 180px"
                  ></Image>
                </View>
              </View>
              <View className="weui-article__section">
                <View className="weui-article__h3">1.2 节标题</View>
                <View className="weui-article__p">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
