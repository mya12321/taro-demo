import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpHalfScreenDialog from '../../components/half-screen-dialog/half-screen-dialog'
import './half-screen-dialog.scss'

@withWeapp({
  data: {
    typeF: false,
    typeS: false,
    typeT: false,
    buttons: [
      {
        type: 'default',
        className: '',
        text: '辅助操作',
        value: 0
      },
      {
        type: 'primary',
        className: '',
        text: '主操作',
        value: 1
      }
    ]
  },
  openTypeF: function() {
    this.setData({
      typeF: true
    })
  },
  openTypeS: function() {
    this.setData({
      typeS: true
    })
  },
  openTypeT: function() {
    this.setData({
      typeT: true
    })
  },
  buttontap(e) {
    console.log(e.detail)
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { typeF, typeT, typeS, buttons } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Half Screen Dialog</View>
          <View className="page__desc">
            半屏弹窗，辅助完成当前页面任务时；提醒用户并引导用户的下一步操作；用户主动发起的任务时。
          </View>
        </View>
        <View className="page__bd">
          <View className="weui-btn-area">
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.openTypeF}
            >
              样式一
            </Button>
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.openTypeS}
            >
              样式二
            </Button>
            <Button
              className="weui-btn"
              type="primary"
              onClick={this.openTypeT}
            >
              样式三
            </Button>
          </View>
          <MpHalfscreendialog
            show={typeF}
            renderTitle={
              <Block>
                <View>测试标题A</View>
              </Block>
            }
            renderDesc={
              <Block>
                <View>这是自定义描述区</View>
              </Block>
            }
            renderFooter={
              <Block>
                <View>
                  <Button type="default" className="weui-btn">
                    按钮A
                  </Button>
                  <Button type="primary" className="weui-btn">
                    按钮B
                  </Button>
                </View>
              </Block>
            }
          ></MpHalfscreendialog>
          <MpHalfscreendialog
            show={typeT}
            closabled={false}
            renderTitle={
              <Block>
                <View>测试标题A</View>
              </Block>
            }
            renderDesc={
              <Block>
                <View>这是自定义描述区</View>
              </Block>
            }
            renderFooter={
              <Block>
                <View>
                  <Button type="default" className="weui-btn">
                    按钮A
                  </Button>
                  <Button type="primary" className="weui-btn">
                    按钮B
                  </Button>
                </View>
              </Block>
            }
          ></MpHalfscreendialog>
          <MpHalfscreendialog
            onButtontap={this.buttontap}
            show={typeS}
            maskClosable={false}
            title="测试标题B"
            subTitle="测试标题B的副标题"
            desc="辅助描述内容，可根据实际需要安排"
            tips="辅助提示内容，可根据实际需要安排"
            buttons={buttons}
          ></MpHalfscreendialog>
        </View>
      </View>
    )
  }
}

export default _C
