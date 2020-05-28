import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './editor.scss'
const util = require('../../../../util/util.js')

const compareVersion = util.compareVersion

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'editor',
      path: 'page/component/pages/editor/editor'
    }
  },

  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...'
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    this.canUse = true
    Taro.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
    const { SDKVersion } = Taro.getSystemInfoSync()

    if (compareVersion(SDKVersion, '2.7.0') >= 0) {
      //
    } else {
      this.canUse = false
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      Taro.showModal({
        title: '提示',
        content:
          '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  onEditorReady() {
    const that = this
    Taro.createSelectorQuery()
      .select('#editor')
      .context(function(res) {
        that.editorCtx = res.context
      })
      .exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    if (!this.canUse) return
    const { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },

  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success() {
        console.log('clear success')
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    Taro.chooseImage({
      count: 1,
      success() {
        that.editorCtx.insertImage({
          src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success() {
            console.log('insert image success')
          }
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'editor'
  }

  render() {
    const { formats, previewarginBottom, placeholder, readOnly } = this.data
    return (
      <View className="container">
        <View className="page-body">
          <View className="wrapper">
            <View className="toolbar" onClick={this.format}>
              <I
                className={
                  'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')
                }
                data-name="bold"
              ></I>
              <I
                className={
                  'iconfont icon-zitixieti ' +
                  (formats.italic ? 'ql-active' : '')
                }
                data-name="italic"
              ></I>
              <I
                className={
                  'iconfont icon-zitixiahuaxian ' +
                  (formats.underline ? 'ql-active' : '')
                }
                data-name="underline"
              ></I>
              <I
                className={
                  'iconfont icon-zitishanchuxian ' +
                  (formats.strike ? 'ql-active' : '')
                }
                data-name="strike"
              ></I>
              <I
                className={
                  'iconfont icon-zuoduiqi ' +
                  (formats.align === 'left' ? 'ql-active' : '')
                }
                data-name="align"
                data-value="left"
              ></I>
              <I
                className={
                  'iconfont icon-juzhongduiqi ' +
                  (formats.align === 'center' ? 'ql-active' : '')
                }
                data-name="align"
                data-value="center"
              ></I>
              <I
                className={
                  'iconfont icon-youduiqi ' +
                  (formats.align === 'right' ? 'ql-active' : '')
                }
                data-name="align"
                data-value="right"
              ></I>
              <I
                className={
                  'iconfont icon-zuoyouduiqi ' +
                  (formats.align === 'justify' ? 'ql-active' : '')
                }
                data-name="align"
                data-value="justify"
              ></I>
              <I
                className={
                  'iconfont icon-line-height ' +
                  (formats.lineHeight ? 'ql-active' : '')
                }
                data-name="lineHeight"
                data-value="2"
              ></I>
              <I
                className={
                  'iconfont icon-Character-Spacing ' +
                  (formats.letterSpacing ? 'ql-active' : '')
                }
                data-name="letterSpacing"
                data-value="2em"
              ></I>
              <I
                className={
                  'iconfont icon-722bianjiqi_duanqianju ' +
                  (formats.marginTop ? 'ql-active' : '')
                }
                data-name="marginTop"
                data-value="20px"
              ></I>
              <I
                className={
                  'iconfont icon-723bianjiqi_duanhouju ' +
                  (formats.micon - previewarginBottom ? 'ql-active' : '')
                }
                data-name="marginBottom"
                data-value="20px"
              ></I>
              <I
                className="iconfont icon-clearedformat"
                onClick={this.removeFormat}
              ></I>
              <I
                className={
                  'iconfont icon-font ' +
                  (formats.fontFamily ? 'ql-active' : '')
                }
                data-name="fontFamily"
                data-value="Pacifico"
              ></I>
              <I
                className={
                  'iconfont icon-fontsize ' +
                  (formats.fontSize === '24px' ? 'ql-active' : '')
                }
                data-name="fontSize"
                data-value="24px"
              ></I>
              <I
                className={
                  'iconfont icon-text_color ' +
                  (formats.color === '#0000ff' ? 'ql-active' : '')
                }
                data-name="color"
                data-value="#0000ff"
              ></I>
              <I
                className={
                  'iconfont icon-fontbgcolor ' +
                  (formats.backgroundColor === '#00ff00' ? 'ql-active' : '')
                }
                data-name="backgroundColor"
                data-value="#00ff00"
              ></I>
              <I className="iconfont icon-date" onClick={this.insertDate}></I>
              <I
                className="iconfont icon--checklist"
                data-name="list"
                data-value="check"
              ></I>
              <I
                className={
                  'iconfont icon-youxupailie ' +
                  (formats.list === 'ordered' ? 'ql-active' : '')
                }
                data-name="list"
                data-value="ordered"
              ></I>
              <I
                className={
                  'iconfont icon-wuxupailie ' +
                  (formats.list === 'bullet' ? 'ql-active' : '')
                }
                data-name="list"
                data-value="bullet"
              ></I>
              <I className="iconfont icon-undo" onClick={this.undo}></I>
              <I className="iconfont icon-redo" onClick={this.redo}></I>
              <I
                className="iconfont icon-outdent"
                data-name="indent"
                data-value="-1"
              ></I>
              <I
                className="iconfont icon-indent"
                data-name="indent"
                data-value="+1"
              ></I>
              <I
                className="iconfont icon-fengexian"
                onClick={this.insertDivider}
              ></I>
              <I
                className="iconfont icon-charutupian"
                onClick={this.insertImage}
              ></I>
              <I
                className={
                  'iconfont icon-format-header-1 ' +
                  (formats.header === 1 ? 'ql-active' : '')
                }
                data-name="header"
                data-value={1}
              ></I>
              <I
                className={
                  'iconfont icon-zitixiabiao ' +
                  (formats.script === 'sub' ? 'ql-active' : '')
                }
                data-name="script"
                data-value="sub"
              ></I>
              <I
                className={
                  'iconfont icon-zitishangbiao ' +
                  (formats.script === 'super' ? 'ql-active' : '')
                }
                data-name="script"
                data-value="super"
              ></I>
              {/*  <i class="iconfont icon-quanping"></i>  */}
              <I className="iconfont icon-shanchu" onClick={this.clear}></I>
              <I
                className={
                  'iconfont icon-direction-rtl ' +
                  (formats.direction === 'rtl' ? 'ql-active' : '')
                }
                data-name="direction"
                data-value="rtl"
              ></I>
            </View>
            <Editor
              id="editor"
              className="ql-container"
              placeholder={placeholder}
              showImgSize
              showImgToolbar
              showImgResize
              onStatuschange={this.onStatusChange}
              readOnly={readOnly}
              onReady={this.onEditorReady}
            ></Editor>
            {/*  <view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <button bindtap="readOnlyChange">{{readOnly ? '可写':'只读'}}</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </view>  */}
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
