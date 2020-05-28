import { Block, View, Progress, Icon } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './progress.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'progress',
      path: 'page/component/pages/progress/progress'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'progress'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'progress' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section page-section-gap">
            <View className="progress-box">
              <Progress percent={20} showInfo strokeWidth={3}></Progress>
            </View>
            <View className="progress-box">
              <Progress percent={40} active strokeWidth={3}></Progress>
              <Icon className="progress-cancel" type="cancel"></Icon>
            </View>
            <View className="progress-box">
              <Progress percent={60} active strokeWidth={3}></Progress>
            </View>
            <View className="progress-box">
              <Progress
                percent={80}
                activeColor="#10AEFF"
                active
                strokeWidth={3}
              ></Progress>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
