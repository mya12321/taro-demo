import { Block, View, Textarea, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './download-file.scss'
const demoImageFileId = require('../../../../config.js').demoImageFileId

// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/storage/downloadFile.html

const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '下载文件',
      path: 'page/cloud/pages/download-file/download-file'
    }
  },

  data: {
    fileDownloaded: false,
    fileId: '',
    filePath: '',
    loading: false
  },

  onLoad() {
    this.setData({
      fileId: app.globalData.fileId || demoImageFileId
    })
  },

  downloadFile() {
    const fileId = this.data.fileId
    if (!fileId) {
      return
    }
    const self = this

    this.setData({
      loading: true
    })
    Taro.cloud.downloadFile({
      fileID: fileId,
      success: res => {
        console.log('[下载文件] 成功：', res)
        self.setData({
          fileDownloaded: true,
          filePath: res.tempFilePath
        })
      },
      fail: err => {
        console.error('[下载文件] 失败：', err)
      },
      complete: () => {
        self.setData({
          loading: false
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '下载文件'
  }

  render() {
    const { fileId, filePath, fileDownloaded, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'downloadFile' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            {fileDownloaded ? (
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
                  <View className="weui-cell">
                    <View className="page-section-ctn">
                      <Image
                        src={filePath}
                        className="image"
                        mode="aspectFit"
                      ></Image>
                    </View>
                  </View>
                </View>
              </Block>
            ) : (
              <Block>
                <View className="weui-cells__title">
                  点击按钮即可从云端存储下载指定云文件
                </View>
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
                </View>
                <View className="btn-area">
                  <Button
                    type="primary"
                    size="40"
                    onClick={this.downloadFile}
                    loading={loading}
                  >
                    下载文件
                  </Button>
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
