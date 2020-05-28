import { Block, View, Textarea, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './scf-storage.scss'
const demoImageFileId = require('../../../../config.js').demoImageFileId

// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-server-api/storage/

const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '云函数操作存储',
      path: 'page/cloud/pages/scf-storage/scf-storage'
    }
  },

  data: {
    fileTempURLDone: false,
    fileId: '',
    tempFileURL: '',
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

    this.setData({
      loading: true
    })
    Taro.cloud.callFunction({
      name: 'getTempFileURL',
      data: {
        fileIdList: [fileId]
      },
      success: res => {
        console.log('[云函数] [getTempFileURL] res: ', res.result)
        if (res.result.length) {
          this.setData({
            fileTempURLDone: true,
            tempFileURL: res.result[0].tempFileURL
          })
        }
      },
      fail: err => {
        console.error('[云函数] [getTempFileURL] 调用失败', err)
      },
      complete: () => {
        this.setData({
          loading: false
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '云函数操作存储'
  }

  render() {
    const { fileId, tempFileURL, fileTempURLDone, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'Storage' }}></HeadTmpl>
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
                  云函数亦可操作文件存储，点击按钮换取临时链接
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
                    通过云函数换取临时链接
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
