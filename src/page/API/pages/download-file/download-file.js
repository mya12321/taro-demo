import { Block, View, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './download-file.scss'
const downloadExampleUrl = require('../../../../config.js').downloadExampleUrl

@withWeapp({
  onShareAppMessage() {
    return {
      title: '下载文件',
      path: 'page/API/pages/download-file/download-file'
    }
  },

  downloadImage() {
    const self = this

    Taro.downloadFile({
      url: downloadExampleUrl,
      success(res) {
        console.log('downloadFile success, res is', res)

        self.setData({
          imageSrc: res.tempFilePath
        })
      },
      fail({ errMsg }) {
        console.log('downloadFile fail, err is:', errMsg)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '下载文件'
  }

  render() {
    const { imageSrc } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'downloadFile' }}></HeadTmpl>
        <View className="page-body">
          {imageSrc ? (
            <Image src={imageSrc} mode="center"></Image>
          ) : (
            <Block>
              <View className="page-body-wording">
                <Text className="page-body-text">
                  点击按钮下载服务端示例图片
                </Text>
              </View>
              <View className="btn-area">
                <Button onClick={this.downloadImage} type="primary">
                  下载
                </Button>
              </View>
            </Block>
          )}
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
