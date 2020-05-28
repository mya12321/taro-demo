import { Block, View, MovableArea, MovableView, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './get-wxml-node-info.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '获取WXML节点信息',
      path: 'page/API/pages/get-wxml-node-info/get-wxml-node-info'
    }
  },

  data: {
    metrics: []
  },

  onReady() {
    this.getNodeInfo()
  },

  getNodeInfo() {
    const $ = Taro.createSelectorQuery()
    const target = $.select('.target')
    target.boundingClientRect()

    $.exec(res => {
      const rect = res[0]
      if (rect) {
        const metrics = []
        // eslint-disable-next-line
        for (const key in rect) {
          if (key !== 'id' && key !== 'dataset') {
            const val = rect[key]
            metrics.push({ key, val })
          }
        }

        this.setData({ metrics })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '获取WXML节点信息'
  }

  render() {
    const { x, y, metrics } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'createSelectorQuery' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <MovableArea>
              <MovableView
                className="target"
                x={x}
                y={y}
                direction="all"
                onChange={this.getNodeInfo}
              >
                Drag
              </MovableView>
            </MovableArea>
          </View>
          <View className="page-section">
            <View className="metric">
              {metrics.map((item, index) => {
                return (
                  <View key={item.key}>
                    <Text className="b">{item.key}</Text>
                    <Text className="span">{item.val}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
