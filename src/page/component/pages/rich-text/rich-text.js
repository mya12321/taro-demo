import { Block, View, ScrollView, Button, RichText } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './rich-text.scss'
const htmlSnip = `<div class="div_class">
  <h1>Title</h1>
  <p class="p">
    Life is&nbsp;<i>like</i>&nbsp;a box of
    <b>&nbsp;chocolates</b>.
  </p>
</div>
`

const nodeSnip = `Page({
  data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'You never know what you're gonna get.'
      }]
    }]
  }
})
`

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'rich-text',
      path: 'page/component/pages/rich-text/rich-text'
    }
  },

  data: {
    htmlSnip,
    nodeSnip,
    renderedByHtml: false,
    renderedByNode: false,
    nodes: [
      {
        name: 'div',
        attrs: {
          class: 'div_class',
          style: 'line-height: 60px; color: #1AAD19;'
        },
        children: [
          {
            type: 'text',
            text: "You never know what you're gonna get."
          }
        ]
      }
    ]
  },
  renderHtml() {
    this.setData({
      renderedByHtml: true
    })
  },
  renderNode() {
    this.setData({
      renderedByNode: true
    })
  },
  enterCode(e) {
    console.log(e.detail.value)
    this.setData({
      htmlSnip: e.detail.value
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'rich-text'
  }

  render() {
    const {
      htmlSnip,
      renderedByHtml,
      nodeSnip,
      nodes,
      renderedByNode
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'rich-text' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-section-title">通过HTML String渲染</View>
            <View className="page-content">
              <ScrollView scrollY>{htmlSnip}</ScrollView>
              <Button type="primary" onClick={this.renderHtml}>
                渲染HTML
              </Button>
              {renderedByHtml && (
                <Block>
                  <RichText nodes={htmlSnip}></RichText>
                </Block>
              )}
            </View>
          </View>
          <View className="page-section">
            <View className="page-section-title">通过节点渲染</View>
            <View className="page-content">
              <ScrollView scrollY>{nodeSnip}</ScrollView>
              <Button type="primary" onClick={this.renderNode}>
                渲染Node
              </Button>
              {renderedByNode && (
                <Block>
                  <RichText nodes={nodes}></RichText>
                </Block>
              )}
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
