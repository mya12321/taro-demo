import { Block, View, Textarea, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './get-temp-file-url.scss'
const demoImageFileId = require('../../../../config.js').demoImageFileId

// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/storage/getTempFileURL.html

const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '获取临时链接',
      path: 'page/cloud/pages/get-temp-file-url/get-temp-file-url'
    }
  },

  data: {
    fileTempURLDone: false,
    fileId: '',
    tempFileURL: '',
    maxAge: 0,
    loading: false
  },

  onLoad() {
    this.setData({
      fileId: app.globalData.fileId || demoImageFileId
    })
  },

  getTempFileURL() {
    const fileId = this.data.fileId
    if (!fileId) {
      return
    }
    const self = this

    this.setData({
      loading: true
    })
    Taro.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        console.log('[换取临时链接] 成功：', res)
        if (res.fileList && res.fileList.length) {
          self.setData({
            fileTempURLDone: true,
            tempFileURL: res.fileList[0].tempFileURL,
            maxAge: res.fileList[0].maxAge
          })
        }
      },
      fail: err => {
        console.error('[换取临时链接] 失败：', err)
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
    navigationBarTitleText: '换取临时链接'
  }

  render() {
    const { fileId, tempFileURL, fileTempURLDone, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'getTempFileURL' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            {fileTempURLDone ? (
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
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">临时链接</View>
                    </View>
                    <View className="weui-cell__bd">
                      <Textarea
                        className="weui-textarea"
                        value={tempFileURL}
                        style="height: 3.3em"
                        disabled
                      ></Textarea>
                    </View>
                  </View>
                  <View className="weui-cell">
                    <View className="page-section-ctn">
                      <Image
                        src={tempFileURL}
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
                  点击按钮即可根据文件 ID 换取临时网络链接
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
                    onClick={this.getTempFileURL}
                    loading={loading}
                  >
                    换取临时链接
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
