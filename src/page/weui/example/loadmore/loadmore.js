import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpLoading from '../../components/loading/loading'
import './loadmore.scss'

@withWeapp({})
class _C extends Taro.Component {
  config = {}

  render() {
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Loadmore</View>
          <View className="page__desc">加载更多</View>
        </View>
        <View className="page__bd">
          <MpLoading type="circle" show={true}></MpLoading>
          {/*  <view class="weui-loadmore">
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                  <view class="weui-loading"></view>
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                  <view class="weui-loadmore__tips">正在加载</view>
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                              </view>  */}
          <View className="weui-loadmore weui-loadmore_line">
            <View className="weui-loadmore__tips weui-loadmore__tips_in-line">
              暂无数据
            </View>
          </View>
          <View className="weui-loadmore weui-loadmore_line weui-loadmore_dot">
            <View className="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
