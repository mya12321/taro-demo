import { Block, View, Textarea, Image, Video } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './cloud-file-component.scss'
const { demoImageFileId, demoVideoFileId } = require('../../../../config.js')

@withWeapp({
  onShareAppMessage() {
    return {
      title: '组件支持',
      path: 'page/cloud/pages/cloud-file-component/cloud-file-component'
    }
  },

  data: {
    imageFileId: demoImageFileId,
    videoFileId: demoVideoFileId
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '组件支持'
  }

  render() {
    const { imageFileId, videoFileId } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'Component Support' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells__title">
              小程序组件支持传入云文件 ID
            </View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">文件 ID</View>
                </View>
                <View className="weui-cell__bd">
                  <Textarea
                    className="weui-textarea"
                    value={imageFileId}
                    style="height: 3.3em"
                    disabled
                  ></Textarea>
                </View>
              </View>
              <View className="weui-cell">
                <View className="page-section-ctn">
                  <Image
                    src={imageFileId}
                    className="image"
                    mode="aspectFit"
                  ></Image>
                </View>
              </View>
            </View>
            <View className="weui-cells__title"></View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd">
                  <View className="weui-label">文件 ID</View>
                </View>
                <View className="weui-cell__bd">
                  <Textarea
                    className="weui-textarea"
                    value={videoFileId}
                    style="height: 3.3em"
                    disabled
                  ></Textarea>
                </View>
              </View>
              <View className="weui-cell">
                <View className="page-section-ctn">
                  <Video src={videoFileId} showCenterPlayBtn={false}></Video>
                </View>
              </View>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
