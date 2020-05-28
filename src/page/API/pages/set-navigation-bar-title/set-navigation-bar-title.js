import { Block, View, Form, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './set-navigation-bar-title.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '设置页面标题',
      path: 'page/API/pages/set-navigation-bar-title/set-navigation-bar-title'
    }
  },

  setNaivgationBarTitle(e) {
    const title = e.detail.value.title
    console.log(title)
    Taro.setNavigationBarTitle({
      title,
      success() {
        console.log('setNavigationBarTitle success')
      },
      fail(err) {
        console.log('setNavigationBarTitle fail, err is', err)
      }
    })

    return false
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '设置页面标题'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'setNaivgationBarTitle' }}></HeadTmpl>
        <Form className="page-body" onSubmit={this.setNaivgationBarTitle}>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell weui-cell_input">
              <View className="weui-cell__hd">
                <View className="weui-label">页面标题</View>
              </View>
              <View className="weui-cell__bd">
                <Input
                  className="weui-input"
                  type="text"
                  placeholder="请输入页面标题并点击设置即可"
                  name="title"
                ></Input>
              </View>
            </View>
          </View>
          <View className="btn-area">
            <Button type="primary" formType="submit">
              设置
            </Button>
          </View>
        </Form>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
