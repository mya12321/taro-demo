import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './action-sheet.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '操作菜单',
      path: 'page/API/pages/action-sheet/action-sheet'
    }
  },

  actionSheetTap() {
    Taro.showActionSheet({
      itemList: ['item1', 'item2', 'item3', 'item4'],
      success(e) {
        console.log(e.tapIndex)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '操作菜单'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'action-sheet' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <Button type="default" onClick={this.actionSheetTap}>
              弹出action sheet
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
