import { Block, View, Text, Navigator, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class FootTmpl extends Taro.Component {
  render() {
    return (
      <Block>
        <Navigator
          className="page-foot"
          openType="switchTab"
          url="/page/component/index"
          hoverClass="none"
        >
          <Image
            className="icon-foot"
            src={require('../image/icon_foot.png')}
          ></Image>
        </Navigator>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
