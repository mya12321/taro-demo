import { Block, View, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './file.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '文件',
      path: 'page/API/pages/file/file'
    }
  },

  onLoad() {
    this.setData({
      savedFilePath: Taro.getStorageSync('savedFilePath')
    })
  },
  data: {
    tempFilePath: '',
    savedFilePath: '',
    dialog: {
      hidden: true
    }
  },
  chooseImage() {
    const that = this
    Taro.chooseImage({
      count: 1,
      success(res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        })
      }
    })
  },
  saveFile() {
    if (this.data.tempFilePath.length > 0) {
      const that = this
      Taro.saveFile({
        tempFilePath: this.data.tempFilePath,
        success(res) {
          that.setData({
            savedFilePath: res.savedFilePath
          })
          Taro.setStorageSync('savedFilePath', res.savedFilePath)
          that.setData({
            dialog: {
              title: '保存成功',
              content: '下次进入应用时，此文件仍可用',
              hidden: false
            }
          })
        },
        fail() {
          that.setData({
            dialog: {
              title: '保存失败',
              content: '应该是有 bug 吧',
              hidden: false
            }
          })
        }
      })
    }
  },
  clear() {
    Taro.setStorageSync('savedFilePath', '')
    this.setData({
      tempFilePath: '',
      savedFilePath: ''
    })
  },
  confirm() {
    this.setData({
      'dialog.hidden': true
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '文件'
  }

  render() {
    const { tempFilePath, savedFilePath, dialog } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'saveFile' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              {tempFilePath != '' && (
                <Block>
                  <Image
                    src={tempFilePath}
                    className="image"
                    mode="aspectFit"
                  ></Image>
                </Block>
              )}
              {tempFilePath === '' && savedFilePath != '' && (
                <Block>
                  <Image
                    src={savedFilePath}
                    className="image"
                    mode="aspectFit"
                  ></Image>
                </Block>
              )}
              {tempFilePath === '' && savedFilePath === '' && (
                <Block>
                  <View
                    className="image-plus image-plus-nb"
                    onClick={this.chooseImage}
                  >
                    <View className="image-plus-horizontal"></View>
                    <View className="image-plus-vertical"></View>
                  </View>
                  <View className="image-plus-text">请选择文件</View>
                </Block>
              )}
            </View>
            <View className="btn-area">
              <Button type="primary" onClick={this.saveFile}>
                保存文件
              </Button>
              <Button onClick={this.clear}>删除文件</Button>
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
