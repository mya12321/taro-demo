import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpDialog from '../../components/dialog/dialog'
import './dialog.scss'

@withWeapp({
  data: {
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    oneButton: [{ text: '确定' }]
  },
  openConfirm: function() {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { dialogShow, buttons, showOneButtonDialog, oneButton } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Dialog</View>
          <View className="page__desc">对话框</View>
        </View>
        <View className="page__bd">
          <View className="weui-btn-area">
            <Button
              className="weui-btn"
              type="default"
              onClick={this.openConfirm}
            >
              确认取消按钮
            </Button>
            <Button
              className="weui-btn"
              type="default"
              onClick={this.tapOneDialogButton}
            >
              只有确认按钮
            </Button>
          </View>
        </View>
        <MpDialog
          title="test"
          show={dialogShow}
          onButtontap={this.tapDialogButton}
          buttons={buttons}
        >
          <View>test content</View>
        </MpDialog>
        <MpDialog
          title="test1"
          show={showOneButtonDialog}
          onButtontap={this.tapDialogButton}
          buttons={oneButton}
        >
          <View>test content1</View>
        </MpDialog>
      </View>
    )
  }
}

export default _C
