import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './upload-file.scss'
const uploadFileUrl = require('../../../../config.js').uploadFileUrl

@withWeapp({
  onShareAppMessage() {
    return {
      title: '上传文件',
      path: 'page/API/pages/upload-file/upload-file'
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

        const imageSrc = res.tempFilePaths[0]

        Taro.uploadFile({
          url: uploadFileUrl,
          filePath: imageSrc,
          name: 'data',
          success(res) {
            console.log('uploadImage success, res is:', res)

            Taro.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc
            })
          },
          fail({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
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
    const { imageSrc } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'uploadFile' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="page-body-info">
              {imageSrc ? (
                <Block>
                  <Image
                    src={imageSrc}
                    className="image"
                    mode="aspectFit"
                  ></Image>
                </Block>
              ) : (
                <Block>
                  <View
                    className="image-plus image-plus-nb"
                    onClick={this.chooseImage}
                  >
                    <View className="image-plus-horizontal"></View>
                    <View className="image-plus-vertical"></View>
                  </View>
                  <View className="image-plus-text">选择图片</View>
                </Block>
              )}
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
