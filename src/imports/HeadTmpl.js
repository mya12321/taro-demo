import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class HeadTmpl extends Taro.Component {
  render() {
    const {
      data: { title, desc }
    } = this.props
    return (
      <Block>
        <View className="page-head">
          <View className="page-head-title">{title}</View>
          <View className="page-head-line"></View>
          {desc && <View className="page-head-desc">{desc}</View>}
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
