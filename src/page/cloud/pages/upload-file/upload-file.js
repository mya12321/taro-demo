import {
  Block,
  View,
  Textarea,
  Image,
  Navigator,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './upload-file.scss'
// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/storage/uploadFile.html

const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '上传文件',
      path: 'page/cloud/pages/upload-file/upload-file'
    }
  },

  data: {
    fileUploaded: false,
    fileId: '',
    filePath: '',
    fromOtherPage: false
  },

  onLoad(options) {
    if (options.from) {
      this.setData({
        fromOtherPage: true
      })
    }
  },

  chooseImage() {
    const self = this

    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])
        const filePath = res.tempFilePaths[0]
        Taro.showLoading({
          title: '上传中'
        })
        app
          .getUserOpenIdViaCloud()
          .then(openid => {
            const cloudPath =
              'upload/' + openid + filePath.match(/\.[^.]+?$/)[0]
            console.log('cloudPath', cloudPath)
            Taro.cloud.uploadFile({
              cloudPath,
              filePath,
              success: res => {
                console.log('[上传文件] 成功：', res)
                app.globalData.fileId = res.fileID
                self.setData({
                  fileUploaded: true,
                  fileId: res.fileID,
                  filePath
                })
                Taro.hideLoading()
              },
              fail: err => {
                console.error('[上传文件] 失败：', err)
                Taro.hideLoading()
                Taro.showToast({
                  icon: 'none',
                  title: '上传失败'
                })
              }
            })
            return openid
          })
          .catch(err => {
            console.error(err)
            Taro.hideLoading()
          })
      },
      fail({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '上传文件'
  }

  render() {
    const { fileId, filePath, fromOtherPage, fileUploaded } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'uploadFile' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            {fileUploaded ? (
              <Block>
                <View className="weui-cells weui-cells_after-title">
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">文件 ID</View>
                    </View>
                    <View className="weui-cell__bd">
                      <Textarea
                        className="weui-textarea"
                        value={fileId}
                        style="height: 3.3em"
                        disabled
                      ></Textarea>
                    </View>
                  </View>
                  <View className="weui-cell page-section-ctn">
                    <Image
                      src={filePath}
                      className="image"
                      mode="aspectFit"
                    ></Image>
                  </View>
                </View>
                {fromOtherPage && (
                  <View className="btn-area">
                    <Navigator openType="navigateBack">
                      <Button type="primary" size="40">
                        返回
                      </Button>
                    </Navigator>
                  </View>
                )}
              </Block>
            ) : (
              <Block>
                <View className="page-body-info">
                  <View
                    className="image-plus image-plus-nb"
                    onClick={this.chooseImage}
                  >
                    <View className="image-plus-horizontal"></View>
                    <View className="image-plus-vertical"></View>
                  </View>
                  <View className="image-plus-text">选择图片</View>
                </View>
              </Block>
            )}
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
