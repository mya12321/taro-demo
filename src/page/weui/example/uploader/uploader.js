import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpCell from '../../components/cell/cell'
import MpCells from '../../components/cells/cells'
import MpUploader from '../../components/uploader/uploader'
import './uploader.scss'

@withWeapp({
  data: {
    files: [
      {
        url:
          'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0'
      }
    ]
  },
  onLoad() {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },
  chooseImage: function(e) {
    var that = this
    Taro.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewImage: function(e) {
    Taro.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('some error')
      }, 1000)
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { selectFile, uplaodFile, files } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Uploader</View>
          <View className="page__desc">上传组件</View>
        </View>
        <View className="page__bd">
          <MpCells>
            <MpCell>
              <MpUploader
                onFail={this.uploadError}
                onSuccess={this.uploadSuccess}
                select={selectFile}
                upload={uplaodFile}
                files={files}
                maxCount="5"
                title="图片上传"
                tips="图片上传提示"
              ></MpUploader>
            </MpCell>
          </MpCells>
        </View>
      </View>
    )
  }
}

export default _C
