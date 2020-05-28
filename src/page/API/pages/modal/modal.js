import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './modal.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '模态弹窗',
      path: 'page/API/pages/modal/modal'
    }
  },

  data: {
    modalHidden: true,
    modalHidden2: true
  },
  modalTap() {
    Taro.showModal({
      title: '弹窗标题',
      content:
        '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      showCancel: false,
      confirmText: '确定'
    })
  },
  noTitlemodalTap() {
    Taro.showModal({
      content:
        '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: '确定',
      cancelText: '取消'
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '模态弹窗'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'modal' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <Button type="default" onClick={this.modalTap}>
              有标题的modal
            </Button>
            <Button type="default" onClick={this.noTitlemodalTap}>
              无标题的modal
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
