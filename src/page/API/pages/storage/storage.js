import { Block, View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './storage.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '数据存储',
      path: 'page/API/pages/storage/storage'
    }
  },

  data: {
    key: '',
    data: '',
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },

  keyChange(e) {
    this.data.key = e.detail.value
  },

  dataChange(e) {
    this.data.data = e.detail.value
  },

  getStorage() {
    const { key, data } = this.data
    let storageData

    if (key.length === 0) {
      this.setData({
        key,
        data,
        'dialog.hidden': false,
        'dialog.title': '读取数据失败',
        'dialog.content': 'key 不能为空'
      })
    } else {
      storageData = Taro.getStorageSync(key)
      if (storageData === '') {
        this.setData({
          key,
          data,
          'dialog.hidden': false,
          'dialog.title': '读取数据失败',
          'dialog.content': '找不到 key 对应的数据'
        })
      } else {
        this.setData({
          key,
          data,
          'dialog.hidden': false,
          'dialog.title': '读取数据成功',
          // eslint-disable-next-line
          'dialog.content': "data: '" + storageData + "'"
        })
      }
    }
  },

  setStorage() {
    const { key, data } = this.data
    if (key.length === 0) {
      this.setData({
        key,
        data,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': 'key 不能为空'
      })
    } else {
      Taro.setStorageSync(key, data)
      this.setData({
        key,
        data,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      })
    }
  },

  clearStorage() {
    Taro.clearStorageSync()
    this.setData({
      key: '',
      data: '',
      'dialog.hidden': false,
      'dialog.title': '清除数据成功',
      'dialog.content': ''
    })
  },

  confirm() {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '数据存储'
  }

  render() {
    const { key, data, dialog } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'get/set/clearStorage' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">key</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    placeholder="请输入key"
                    name="key"
                    value={key}
                    onInput={this.keyChange}
                  ></Input>
                </View>
              </View>
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">value</View>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    type="text"
                    placeholder="请输入value"
                    name="data"
                    value={data}
                    onInput={this.dataChange}
                  ></Input>
                </View>
              </View>
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.setStorage}>
                存储数据
              </Button>
              <Button onClick={this.getStorage}>读取数据</Button>
              <Button onClick={this.clearStorage}>清理数据</Button>
            </View>
          </View>
        </View>
        <Modal
          title={dialog.title}
          hidden={dialog.hidden}
          noCancel
          onConfirm={this.confirm}
        >
          {dialog.content}
        </Modal>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
