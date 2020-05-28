import {
  Block,
  View,
  Text,
  Navigator,
  Button,
  Textarea
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './delete-file.scss'
// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/storage/deleteFile.html

const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '删除文件',
      path: 'page/cloud/pages/delete-file/delete-file'
    }
  },

  data: {
    fileId: '',
    loading: false
  },

  onLoad() {
    this.setData({
      fileId: app.globalData.fileId || ''
    })
  },

  onShow() {
    this.setData({
      fileId: app.globalData.fileId || ''
    })
  },

  deleteFile() {
    const fileId = this.data.fileId
    if (!fileId) {
      return
    }
    const self = this

    this.setData({
      loading: true
    })
    Taro.cloud.deleteFile({
      fileList: [fileId],
      success: res => {
        console.log('[删除文件] 成功：', res)
        if (res.fileList && res.fileList.length) {
          self.setData({
            fileId: ''
          })
        }
        app.globalData.fileId = ''
        Taro.showToast({
          title: '删除成功'
        })
      },
      fail: err => {
        console.error('[删除文件] 失败：', err)
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
    navigationBarTitleText: '删除文件'
  }

  render() {
    const { fileId, loading } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'deleteFile' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            {!fileId ? (
              <Block>
                <View className="page-section-ctn">
                  <Text className="page-body-text">
                    还未上传过文件，请先点击按钮上传
                  </Text>
                </View>
                <View className="btn-area">
                  <Navigator url="/page/cloud/pages/upload-file/upload-file?from=delete-file">
                    <Button type="primary" size="40">
                      上传文件
                    </Button>
                  </Navigator>
                </View>
              </Block>
            ) : (
              <Block>
                <View className="weui-cells__title">
                  点击按钮即可删除指定文件
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
                    onClick={this.deleteFile}
                    loading={loading}
                  >
                    删除文件
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
