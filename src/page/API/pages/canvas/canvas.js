import { Block, View, Canvas, ScrollView, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './canvas.scss'
const example = require('./example.js')

@withWeapp({
  onShareAppMessage() {
    return {
      title: '创建画布',
      path: 'page/API/pages/canvas/canvas'
    }
  },

  onLoad() {
    this.context = Taro.createContext()

    const methods = Object.keys(example)
    this.setData({
      methods
    })

    const that = this
    methods.forEach(function(method) {
      that[method] = function() {
        example[method](that.context)
        const actions = that.context.getActions()

        Taro.drawCanvas({
          canvasId: 'canvas',
          actions
        })
      }
    })
  },

  toTempFilePath() {
    Taro.canvasToTempFilePath({
      canvasId: 'canvas',
      success(res) {
        console.log(res)
      },

      fail(res) {
        console.log(res)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '创建画布'
  }

  render() {
    const { methods } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'createContext' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <Canvas className="canvas-element" canvasId="canvas"></Canvas>
            <ScrollView className="canvas-buttons" scrollY="true">
              {methods.map((method, index) => {
                return (
                  <Block>
                    <Button className="canvas-button" onClick={method}>
                      {method}
                    </Button>
                  </Block>
                )
              })}
              <Button
                className="canvas-button"
                onClick={this.toTempFilePath}
                type="primary"
              >
                toTempFilePath
              </Button>
            </ScrollView>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
