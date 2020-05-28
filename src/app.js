import { Block } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './app.scss'
const config = require('./config.js')

global.isDemo = true

@withWeapp({
  onLaunch(opts) {
    console.log('App Launch', opts)
    if (!Taro.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      Taro.cloud.init({
        env: config.envId,
        traceUser: true
      })
    }
  },
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId(callback) {
    const self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      Taro.login({
        success(data) {
          Taro.request({
            url: config.openIdUrl,
            data: {
              code: data.code
            },
            success(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail(res) {
              console.log(
                '拉取用户openid失败，将无法正常使用开放接口等服务',
                res
              )
              callback(res)
            }
          })
        },
        fail(err) {
          console.log(
            'wx.login 接口调用失败，将无法正常使用开放接口等服务',
            err
          )
          callback(err)
        }
      })
    }
  },
  // 通过云函数获取用户 openid，支持回调或 Promise
  getUserOpenIdViaCloud() {
    return Taro.cloud
      .callFunction({
        name: 'wxContext',
        data: {}
      })
      .then(res => {
        this.globalData.openid = res.result.openid
        return res.result.openid
      })
  }
})
class App extends Taro.Component {
  config = {
    pages: [
      'page/component/index',
      'page/component/pages/view/view',
      'page/component/pages/scroll-view/scroll-view',
      'page/component/pages/swiper/swiper',
      'page/component/pages/text/text',
      'page/component/pages/icon/icon',
      'page/component/pages/progress/progress',
      'page/component/pages/button/button',
      'page/component/pages/checkbox/checkbox',
      'page/component/pages/form/form',
      'page/component/pages/input/input',
      'page/component/pages/label/label',
      'page/component/pages/picker/picker',
      'page/component/pages/radio/radio',
      'page/component/pages/slider/slider',
      'page/component/pages/switch/switch',
      'page/component/pages/textarea/textarea',
      'page/component/pages/navigator/navigator',
      'page/component/pages/navigator/navigate',
      'page/component/pages/navigator/redirect',
      'page/component/pages/image/image',
      'page/component/pages/audio/audio',
      'page/component/pages/video/video',
      'page/component/pages/map/map',
      'page/component/pages/canvas/canvas',
      'page/component/pages/ad/ad',
      'page/component/pages/movable-view/movable-view',
      'page/component/pages/cover-view/cover-view',
      'page/component/pages/rich-text/rich-text',
      'page/API/index',
      'page/API/pages/login/login',
      'page/API/pages/get-user-info/get-user-info',
      'page/API/pages/request-payment/request-payment',
      'page/API/pages/share/share',
      'page/API/pages/share-button/share-button',
      'page/API/pages/custom-message/custom-message',
      'page/API/pages/template-message/template-message',
      'page/API/pages/set-navigation-bar-title/set-navigation-bar-title',
      'page/API/pages/navigation-bar-loading/navigation-bar-loading',
      'page/API/pages/navigator/navigator',
      'page/API/pages/pull-down-refresh/pull-down-refresh',
      'page/API/pages/animation/animation',
      'page/API/pages/action-sheet/action-sheet',
      'page/API/pages/modal/modal',
      'page/API/pages/toast/toast',
      'page/API/pages/get-network-type/get-network-type',
      'page/API/pages/on-network-status-change/on-network-status-change',
      'page/API/pages/get-system-info/get-system-info',
      'page/API/pages/on-compass-change/on-compass-change',
      'page/API/pages/make-phone-call/make-phone-call',
      'page/API/pages/scan-code/scan-code',
      'page/API/pages/request/request',
      'page/API/pages/web-socket/web-socket',
      'page/API/pages/upload-file/upload-file',
      'page/API/pages/download-file/download-file',
      'page/API/pages/image/image',
      'page/API/pages/voice/voice',
      'page/API/pages/file/file',
      'page/API/pages/on-accelerometer-change/on-accelerometer-change',
      'page/API/pages/canvas/canvas',
      'page/API/pages/background-audio/background-audio',
      'page/API/pages/video/video',
      'page/API/pages/get-location/get-location',
      'page/API/pages/open-location/open-location',
      'page/API/pages/choose-location/choose-location',
      'page/API/pages/storage/storage',
      'page/component/pages/picker-view/picker-view',
      'page/component/pages/camera/camera',
      'page/component/pages/camera-scan-code/camera-scan-code',
      'page/API/pages/get-wxml-node-info/get-wxml-node-info',
      'page/component/pages/open-data/open-data',
      'page/component/pages/web-view/web-view',
      'page/API/pages/load-font-face/load-font-face',
      'page/API/pages/clipboard-data/clipboard-data',
      'page/API/pages/bluetooth/bluetooth',
      'page/API/pages/screen-brightness/screen-brightness',
      'page/API/pages/vibrate/vibrate',
      'page/API/pages/add-contact/add-contact',
      'page/API/pages/wifi/wifi',
      'page/API/pages/page-scroll/page-scroll',
      'page/API/pages/intersection-observer/intersection-observer',
      'page/API/pages/capture-screen/capture-screen',
      'page/API/pages/worker/worker',
      'page/API/pages/ibeacon/ibeacon',
      'page/API/pages/choose-address/choose-address',
      'page/API/pages/setting/setting',
      'page/API/pages/choose-invoice-title/choose-invoice-title',
      'page/API/pages/soter-authentication/soter-authentication',
      'page/component/pages/map-styles/map-styles',
      'page/cloud/index',
      'page/cloud/pages/user-authentication/user-authentication',
      'page/cloud/pages/get-wx-context/get-wx-context',
      'page/cloud/pages/upload-file/upload-file',
      'page/cloud/pages/download-file/download-file',
      'page/cloud/pages/get-temp-file-url/get-temp-file-url',
      'page/cloud/pages/delete-file/delete-file',
      'page/cloud/pages/cloud-file-component/cloud-file-component',
      'page/cloud/pages/crud/crud',
      'page/cloud/pages/crud-detail/crud-detail',
      'page/cloud/pages/db-permission/db-permission',
      'page/cloud/pages/server-date/server-date',
      'page/cloud/pages/scf-database/scf-database',
      'page/cloud/pages/scf-storage/scf-storage',
      'page/cloud/pages/scf-openapi/scf-openapi',
      'page/component/pages/doc-web-view/doc-web-view',
      'page/API/pages/doc-web-view/doc-web-view',
      'page/cloud/pages/doc-web-view/doc-web-view',
      'page/component/pages/editor/editor',
      'page/weui/example/index',
      'page/weui/example/cell/cell',
      'page/weui/example/slideview/slideview',
      'page/weui/example/form/form',
      'page/weui/example/uploader/uploader',
      'page/weui/example/article/article',
      'page/weui/example/badge/badge',
      'page/weui/example/flex/flex',
      'page/weui/example/footer/footer',
      'page/weui/example/gallery/gallery',
      'page/weui/example/grid/grid',
      'page/weui/example/loadmore/loadmore',
      'page/weui/example/loading/loading',
      'page/weui/example/panel/panel',
      'page/weui/example/preview/preview',
      'page/weui/example/dialog/dialog',
      'page/weui/example/msg/msg',
      'page/weui/example/msg/msg_text',
      'page/weui/example/msg/msg_text_primary',
      'page/weui/example/msg/msg_success',
      'page/weui/example/msg/msg_fail',
      'page/weui/example/navbar/navbar',
      'page/weui/example/navigation/navigation',
      'page/weui/example/tabbar/tabbar',
      'page/weui/example/icons/icons',
      'page/weui/example/form-page/form-page',
      'page/weui/example/half-screen-dialog/half-screen-dialog',
      // 'page/weui/example/actionsheet/actionsheet'
    ],
    window: {
      navigationBarTextStyle: 'black',
      navigationBarTitleText: '演示',
      navigationBarBackgroundColor: '#F8F8F8',
      backgroundColor: '#F8F8F8'
    },
    tabBar: {
      color: '#7A7E83',
      selectedColor: '#3cc51f',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'page/component/index',
          iconPath: 'image/icon_component.png',
          selectedIconPath: 'image/icon_component_HL.png',
          text: '组件'
        },
        {
          pagePath: 'page/weui/example/index',
          iconPath: 'image/icon_component.png',
          selectedIconPath: 'image/icon_component_HL.png',
          text: '扩展组件'
        },
        {
          pagePath: 'page/API/index',
          iconPath: 'image/icon_API.png',
          selectedIconPath: 'image/icon_API_HL.png',
          text: '接口'
        },
        {
          pagePath: 'page/cloud/index',
          iconPath: 'image/icon_cloud.png',
          selectedIconPath: 'image/icon_cloud_HL.png',
          text: '云开发'
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      connectSocket: 10000,
      uploadFile: 10000,
      downloadFile: 10000
    },
    navigateToMiniProgramAppIdList: ['wx4f1b24bdc99fa23b'],
    workers: 'workers',
    debug: false,
    style: 'v2',
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    },
    cloud: true,
    sitemapLocation: 'sitemap.json'
  }

  render() {
    return null
  }
}

export default App
Taro.render(<App />, document.getElementById('app'))
