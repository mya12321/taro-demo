import { Block, View, Form, Picker, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './image.scss'
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]

@withWeapp({
  onShareAppMessage() {
    return {
      title: '图片',
      path: 'page/API/pages/image/image'
    }
  },

  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    Taro.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src

    Taro.previewImage({
      current,
      urls: this.data.imageList
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '图片'
  }

  render() {
    const {
      sourceType,
      sourceTypeIndex,
      sizeType,
      sizeTypeIndex,
      count,
      countIndex,
      imageList
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'choose/previewImage' }}></HeadTmpl>
        <View className="page-body">
          <Form>
            <View className="page-section">
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">图片来源</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Picker
                      range={sourceType}
                      onChange={this.sourceTypeChange}
                      value={sourceTypeIndex}
                      mode="selector"
                    >
                      <View className="weui-input">
                        {sourceType[sourceTypeIndex]}
                      </View>
                    </Picker>
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">图片质量</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Picker
                      range={sizeType}
                      onChange={this.sizeTypeChange}
                      value={sizeTypeIndex}
                      mode="selector"
                    >
                      <View className="weui-input">
                        {sizeType[sizeTypeIndex]}
                      </View>
                    </Picker>
                  </View>
                </View>
                <View className="weui-cell weui-cell_input">
                  <View className="weui-cell__hd">
                    <View className="weui-label">数量限制</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Picker
                      range={count}
                      onChange={this.countChange}
                      value={countIndex}
                      mode="selector"
                    >
                      <View className="weui-input">{count[countIndex]}</View>
                    </Picker>
                  </View>
                </View>
              </View>
              <View className="weui-cells">
                <View className="weui-cell">
                  <View className="weui-cell__bd">
                    <View className="weui-uploader">
                      <View className="weui-uploader__hd">
                        <View className="weui-uploader__title">
                          点击可预览选好的图片
                        </View>
                        <View className="weui-uploader__info">
                          {imageList.length + '/' + count[countIndex]}
                        </View>
                      </View>
                      <View className="weui-uploader__bd">
                        <View className="weui-uploader__files">
                          {imageList.map((image, index) => {
                            return (
                              <Block>
                                <View className="weui-uploader__file">
                                  <Image
                                    className="weui-uploader__img"
                                    src={image}
                                    data-src={image}
                                    onClick={this.previewImage}
                                  ></Image>
                                </View>
                              </Block>
                            )
                          })}
                        </View>
                        <View className="weui-uploader__input-box">
                          <View
                            className="weui-uploader__input"
                            onClick={this.chooseImage}
                          ></View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Form>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
