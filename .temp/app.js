
import Taro from "@tarojs/taro-h5";
import withWeapp from '@tarojs/with-weapp';
import './app.scss';
import Nerv from 'nervjs';
import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/page/component/index"
});

mountApis({
  "basename": "/",
  "customRoutes": {}
}, _taroHistory);
const config = require('./config.js');

global.isDemo = true;

@withWeapp({
  onLaunch(opts) {
    console.log('App Launch', opts);
    if (!Taro.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      Taro.cloud.init({
        env: config.envId,
        traceUser: true
      });
    }
  },
  onShow(opts) {
    console.log('App Show', opts);
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId(callback) {
    const self = this;

    if (self.globalData.openid) {
      callback(null, self.globalData.openid);
    } else {
      Taro.login({
        success(data) {
          Taro.request({
            url: config.openIdUrl,
            data: {
              code: data.code
            },
            success(res) {
              console.log('拉取openid成功', res);
              self.globalData.openid = res.data.openid;
              callback(null, self.globalData.openid);
            },
            fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res);
              callback(res);
            }
          });
        },
        fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err);
          callback(err);
        }
      });
    }
  },
  // 通过云函数获取用户 openid，支持回调或 Promise
  getUserOpenIdViaCloud() {
    return Taro.cloud.callFunction({
      name: 'wxContext',
      data: {}
    }).then(res => {
      this.globalData.openid = res.result.openid;
      return res.result.openid;
    });
  }
})
class App extends Taro.Component {
  state = {
    __tabs: {
      color: '#7A7E83',
      selectedColor: '#3cc51f',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: "/page/component/index",
        iconPath: require("./image/icon_component.png"),
        selectedIconPath: require("./image/icon_component_HL.png"),
        text: '组件'
      }, {
        pagePath: "/page/weui/example/index",
        iconPath: require("./image/icon_component.png"),
        selectedIconPath: require("./image/icon_component_HL.png"),
        text: '扩展组件'
      }, {
        pagePath: "/page/API/index",
        iconPath: require("./image/icon_API.png"),
        selectedIconPath: require("./image/icon_API_HL.png"),
        text: '接口'
      }, {
        pagePath: "/page/cloud/index",
        iconPath: require("./image/icon_cloud.png"),
        selectedIconPath: require("./image/icon_cloud_HL.png"),
        text: '云开发'
      }],
      mode: "hash",
      basename: "/",
      customRoutes: {}
    }
  };

  config = {
    pages: ["/page/component/index", "/page/component/pages/view/view", "/page/component/pages/scroll-view/scroll-view", "/page/component/pages/swiper/swiper", "/page/component/pages/text/text", "/page/component/pages/icon/icon", "/page/component/pages/progress/progress", "/page/component/pages/button/button", "/page/component/pages/checkbox/checkbox", "/page/component/pages/form/form", "/page/component/pages/input/input", "/page/component/pages/label/label", "/page/component/pages/picker/picker", "/page/component/pages/radio/radio", "/page/component/pages/slider/slider", "/page/component/pages/switch/switch", "/page/component/pages/textarea/textarea", "/page/component/pages/navigator/navigator", "/page/component/pages/navigator/navigate", "/page/component/pages/navigator/redirect", "/page/component/pages/image/image", "/page/component/pages/audio/audio", "/page/component/pages/video/video", "/page/component/pages/map/map", "/page/component/pages/canvas/canvas", "/page/component/pages/ad/ad", "/page/component/pages/movable-view/movable-view", "/page/component/pages/cover-view/cover-view", "/page/component/pages/rich-text/rich-text", "/page/API/index", "/page/API/pages/login/login", "/page/API/pages/get-user-info/get-user-info", "/page/API/pages/request-payment/request-payment", "/page/API/pages/share/share", "/page/API/pages/share-button/share-button", "/page/API/pages/custom-message/custom-message", "/page/API/pages/template-message/template-message", "/page/API/pages/set-navigation-bar-title/set-navigation-bar-title", "/page/API/pages/navigation-bar-loading/navigation-bar-loading", "/page/API/pages/navigator/navigator", "/page/API/pages/pull-down-refresh/pull-down-refresh", "/page/API/pages/animation/animation", "/page/API/pages/action-sheet/action-sheet", "/page/API/pages/modal/modal", "/page/API/pages/toast/toast", "/page/API/pages/get-network-type/get-network-type", "/page/API/pages/on-network-status-change/on-network-status-change", "/page/API/pages/get-system-info/get-system-info", "/page/API/pages/on-compass-change/on-compass-change", "/page/API/pages/make-phone-call/make-phone-call", "/page/API/pages/scan-code/scan-code", "/page/API/pages/request/request", "/page/API/pages/web-socket/web-socket", "/page/API/pages/upload-file/upload-file", "/page/API/pages/download-file/download-file", "/page/API/pages/image/image", "/page/API/pages/voice/voice", "/page/API/pages/file/file", "/page/API/pages/on-accelerometer-change/on-accelerometer-change", "/page/API/pages/canvas/canvas", "/page/API/pages/background-audio/background-audio", "/page/API/pages/video/video", "/page/API/pages/get-location/get-location", "/page/API/pages/open-location/open-location", "/page/API/pages/choose-location/choose-location", "/page/API/pages/storage/storage", "/page/component/pages/picker-view/picker-view", "/page/component/pages/camera/camera", "/page/component/pages/camera-scan-code/camera-scan-code", "/page/API/pages/get-wxml-node-info/get-wxml-node-info", "/page/component/pages/open-data/open-data", "/page/component/pages/web-view/web-view", "/page/API/pages/load-font-face/load-font-face", "/page/API/pages/clipboard-data/clipboard-data", "/page/API/pages/bluetooth/bluetooth", "/page/API/pages/screen-brightness/screen-brightness", "/page/API/pages/vibrate/vibrate", "/page/API/pages/add-contact/add-contact", "/page/API/pages/wifi/wifi", "/page/API/pages/page-scroll/page-scroll", "/page/API/pages/intersection-observer/intersection-observer", "/page/API/pages/capture-screen/capture-screen", "/page/API/pages/worker/worker", "/page/API/pages/ibeacon/ibeacon", "/page/API/pages/choose-address/choose-address", "/page/API/pages/setting/setting", "/page/API/pages/choose-invoice-title/choose-invoice-title", "/page/API/pages/soter-authentication/soter-authentication", "/page/component/pages/map-styles/map-styles", "/page/cloud/index", "/page/cloud/pages/user-authentication/user-authentication", "/page/cloud/pages/get-wx-context/get-wx-context", "/page/cloud/pages/upload-file/upload-file", "/page/cloud/pages/download-file/download-file", "/page/cloud/pages/get-temp-file-url/get-temp-file-url", "/page/cloud/pages/delete-file/delete-file", "/page/cloud/pages/cloud-file-component/cloud-file-component", "/page/cloud/pages/crud/crud", "/page/cloud/pages/crud-detail/crud-detail", "/page/cloud/pages/db-permission/db-permission", "/page/cloud/pages/server-date/server-date", "/page/cloud/pages/scf-database/scf-database", "/page/cloud/pages/scf-storage/scf-storage", "/page/cloud/pages/scf-openapi/scf-openapi", "/page/component/pages/doc-web-view/doc-web-view", "/page/API/pages/doc-web-view/doc-web-view", "/page/cloud/pages/doc-web-view/doc-web-view", "/page/component/pages/editor/editor", "/page/weui/example/index", "/page/weui/example/cell/cell", "/page/weui/example/slideview/slideview", "/page/weui/example/form/form", "/page/weui/example/uploader/uploader", "/page/weui/example/article/article", "/page/weui/example/badge/badge", "/page/weui/example/flex/flex", "/page/weui/example/footer/footer", "/page/weui/example/gallery/gallery", "/page/weui/example/grid/grid", "/page/weui/example/loadmore/loadmore", "/page/weui/example/loading/loading", "/page/weui/example/panel/panel", "/page/weui/example/preview/preview", "/page/weui/example/dialog/dialog", "/page/weui/example/msg/msg", "/page/weui/example/msg/msg_text", "/page/weui/example/msg/msg_text_primary", "/page/weui/example/msg/msg_success", "/page/weui/example/msg/msg_fail", "/page/weui/example/navbar/navbar", "/page/weui/example/navigation/navigation", "/page/weui/example/tabbar/tabbar", "/page/weui/example/icons/icons", "/page/weui/example/form-page/form-page", "/page/weui/example/half-screen-dialog/half-screen-dialog"],
    window: {
      navigationBarTextStyle: 'black',
      navigationBarTitleText: '演示',
      navigationBarBackgroundColor: '#F8F8F8',
      backgroundColor: '#F8F8F8'
    },
    tabBar: { color: '#7A7E83', selectedColor: '#3cc51f', borderStyle: 'black', backgroundColor: '#ffffff', list: [{ pagePath: "/page/component/index", iconPath: require("./image/icon_component.png"), selectedIconPath: require("./image/icon_component_HL.png"), text: '组件' }, { pagePath: "/page/weui/example/index", iconPath: require("./image/icon_component.png"), selectedIconPath: require("./image/icon_component_HL.png"), text: '扩展组件' }, { pagePath: "/page/API/index", iconPath: require("./image/icon_API.png"), selectedIconPath: require("./image/icon_API_HL.png"), text: '接口' }, { pagePath: "/page/cloud/index", iconPath: require("./image/icon_cloud.png"), selectedIconPath: require("./image/icon_cloud_HL.png"), text: '云开发' }], mode: "hash",
      basename: "/",
      customRoutes: {}
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
  };

  render() {
    return <TabbarContainer>
          
        <TabbarPanel>
          
                <Router mode={"hash"} history={_taroHistory} routes={[{
          path: '/page/component/index',
          componentLoader: () => import( /* webpackChunkName: "page_component_index" */'./page/component/index'),
          isIndex: true
        }, {
          path: '/page/component/pages/view/view',
          componentLoader: () => import( /* webpackChunkName: "page_component_view_view" */'./page/component/pages/view/view'),
          isIndex: false
        }, {
          path: '/page/component/pages/scroll-view/scroll-view',
          componentLoader: () => import( /* webpackChunkName: "page_component_scroll-view_scroll-view" */'./page/component/pages/scroll-view/scroll-view'),
          isIndex: false
        }, {
          path: '/page/component/pages/swiper/swiper',
          componentLoader: () => import( /* webpackChunkName: "page_component_swiper_swiper" */'./page/component/pages/swiper/swiper'),
          isIndex: false
        }, {
          path: '/page/component/pages/text/text',
          componentLoader: () => import( /* webpackChunkName: "page_component_text_text" */'./page/component/pages/text/text'),
          isIndex: false
        }, {
          path: '/page/component/pages/icon/icon',
          componentLoader: () => import( /* webpackChunkName: "page_component_icon_icon" */'./page/component/pages/icon/icon'),
          isIndex: false
        }, {
          path: '/page/component/pages/progress/progress',
          componentLoader: () => import( /* webpackChunkName: "page_component_progress_progress" */'./page/component/pages/progress/progress'),
          isIndex: false
        }, {
          path: '/page/component/pages/button/button',
          componentLoader: () => import( /* webpackChunkName: "page_component_button_button" */'./page/component/pages/button/button'),
          isIndex: false
        }, {
          path: '/page/component/pages/checkbox/checkbox',
          componentLoader: () => import( /* webpackChunkName: "page_component_checkbox_checkbox" */'./page/component/pages/checkbox/checkbox'),
          isIndex: false
        }, {
          path: '/page/component/pages/form/form',
          componentLoader: () => import( /* webpackChunkName: "page_component_form_form" */'./page/component/pages/form/form'),
          isIndex: false
        }, {
          path: '/page/component/pages/input/input',
          componentLoader: () => import( /* webpackChunkName: "page_component_input_input" */'./page/component/pages/input/input'),
          isIndex: false
        }, {
          path: '/page/component/pages/label/label',
          componentLoader: () => import( /* webpackChunkName: "page_component_label_label" */'./page/component/pages/label/label'),
          isIndex: false
        }, {
          path: '/page/component/pages/picker/picker',
          componentLoader: () => import( /* webpackChunkName: "page_component_picker_picker" */'./page/component/pages/picker/picker'),
          isIndex: false
        }, {
          path: '/page/component/pages/radio/radio',
          componentLoader: () => import( /* webpackChunkName: "page_component_radio_radio" */'./page/component/pages/radio/radio'),
          isIndex: false
        }, {
          path: '/page/component/pages/slider/slider',
          componentLoader: () => import( /* webpackChunkName: "page_component_slider_slider" */'./page/component/pages/slider/slider'),
          isIndex: false
        }, {
          path: '/page/component/pages/switch/switch',
          componentLoader: () => import( /* webpackChunkName: "page_component_switch_switch" */'./page/component/pages/switch/switch'),
          isIndex: false
        }, {
          path: '/page/component/pages/textarea/textarea',
          componentLoader: () => import( /* webpackChunkName: "page_component_textarea_textarea" */'./page/component/pages/textarea/textarea'),
          isIndex: false
        }, {
          path: '/page/component/pages/navigator/navigator',
          componentLoader: () => import(
          /* webpackChunkName: "page_component_navigator_navigator" */'./page/component/pages/navigator/navigator'),
          isIndex: false
        }, {
          path: '/page/component/pages/navigator/navigate',
          componentLoader: () => import( /* webpackChunkName: "page_component_navigator_navigate" */'./page/component/pages/navigator/navigate'),
          isIndex: false
        }, {
          path: '/page/component/pages/navigator/redirect',
          componentLoader: () => import( /* webpackChunkName: "page_component_navigator_redirect" */'./page/component/pages/navigator/redirect'),
          isIndex: false
        }, {
          path: '/page/component/pages/image/image',
          componentLoader: () => import( /* webpackChunkName: "page_component_image_image" */'./page/component/pages/image/image'),
          isIndex: false
        }, {
          path: '/page/component/pages/audio/audio',
          componentLoader: () => import( /* webpackChunkName: "page_component_audio_audio" */'./page/component/pages/audio/audio'),
          isIndex: false
        }, {
          path: '/page/component/pages/video/video',
          componentLoader: () => import( /* webpackChunkName: "page_component_video_video" */'./page/component/pages/video/video'),
          isIndex: false
        }, {
          path: '/page/component/pages/map/map',
          componentLoader: () => import( /* webpackChunkName: "page_component_map_map" */'./page/component/pages/map/map'),
          isIndex: false
        }, {
          path: '/page/component/pages/canvas/canvas',
          componentLoader: () => import( /* webpackChunkName: "page_component_canvas_canvas" */
          './page/component/pages/canvas/canvas'),
          isIndex: false
        }, {
          path: '/page/component/pages/ad/ad',
          componentLoader: () => import( /* webpackChunkName: "page_component_ad_ad" */'./page/component/pages/ad/ad'),
          isIndex: false
        }, {
          path: '/page/component/pages/movable-view/movable-view',
          componentLoader: () => import( /* webpackChunkName: "page_component_movable-view_movable-view" */'./page/component/pages/movable-view/movable-view'),
          isIndex: false
        }, {
          path: '/page/component/pages/cover-view/cover-view',
          componentLoader: () => import( /* webpackChunkName: "page_component_cover-view_cover-view" */'./page/component/pages/cover-view/cover-view'),
          isIndex: false
        }, {
          path: '/page/component/pages/rich-text/rich-text',
          componentLoader: () => import( /* webpackChunkName: "page_component_rich-text_rich-text" */'./page/component/pages/rich-text/rich-text'),
          isIndex: false
        }, {
          path: '/page/API/index',
          componentLoader: () => import( /* webpackChunkName: "page_API_index" */'./page/API/index'),
          isIndex: false
        }, {
          path: '/page/API/pages/login/login',
          componentLoader: () => import( /* webpackChunkName: "page_API_login_login" */'./page/API/pages/login/login'),
          isIndex: false
        }, {
          path: '/page/API/pages/get-user-info/get-user-info',
          componentLoader: () => import( /* webpackChunkName: "page_API_get-user-info_get-user-info" */'./page/API/pages/get-user-info/get-user-info'),
          isIndex: false
        }, {
          path: '/page/API/pages/request-payment/request-payment',
          componentLoader: () => import( /* webpackChunkName: "page_API_request-payment_request-payment" */'./page/API/pages/request-payment/request-payment'),
          isIndex: false
        }, {
          path: '/page/API/pages/share/share',
          componentLoader: () => import( /* webpackChunkName: "page_API_share_share" */'./page/API/pages/share/share'),
          isIndex: false
        }, {
          path: '/page/API/pages/share-button/share-button',
          componentLoader: () => import( /* webpackChunkName: "page_API_share-button_share-button" */'./page/API/pages/share-button/share-button'),
          isIndex: false
        }, {
          path: '/page/API/pages/custom-message/custom-message',
          componentLoader: () => import( /* webpackChunkName: "page_API_custom-message_custom-message" */'./page/API/pages/custom-message/custom-message'),
          isIndex: false
        }, {
          path: '/page/API/pages/template-message/template-message',
          componentLoader: () => import( /* webpackChunkName: "page_API_template-message_template-message" */'./page/API/pages/template-message/template-message'),
          isIndex: false
        }, {
          path: '/page/API/pages/set-navigation-bar-title/set-navigation-bar-title',
          componentLoader: () => import( /* webpackChunkName: "page_API_set-navigation-bar-title_set-navigation-bar-title" */'./page/API/pages/set-navigation-bar-title/set-navigation-bar-title'),
          isIndex: false
        }, {
          path: '/page/API/pages/navigation-bar-loading/navigation-bar-loading',
          componentLoader: () => import( /* webpackChunkName: "page_API_navigation-bar-loading_navigation-bar-loading" */'./page/API/pages/navigation-bar-loading/navigation-bar-loading'),
          isIndex: false
        }, {
          path: '/page/API/pages/navigator/navigator',
          componentLoader: () => import( /* webpackChunkName: "page_API_navigator_navigator" */'./page/API/pages/navigator/navigator'),
          isIndex: false
        }, {
          path: '/page/API/pages/pull-down-refresh/pull-down-refresh',
          componentLoader: () => import( /* webpackChunkName: "page_API_pull-down-refresh_pull-down-refresh" */'./page/API/pages/pull-down-refresh/pull-down-refresh'),
          isIndex: false
        }, {
          path: '/page/API/pages/animation/animation',
          componentLoader: () => import( /* webpackChunkName: "page_API_animation_animation" */'./page/API/pages/animation/animation'),
          isIndex: false
        }, {
          path: '/page/API/pages/action-sheet/action-sheet',
          componentLoader: () => import( /* webpackChunkName: "page_API_action-sheet_action-sheet" */'./page/API/pages/action-sheet/action-sheet'),
          isIndex: false
        }, {
          path: '/page/API/pages/modal/modal',
          componentLoader: () => import( /* webpackChunkName: "page_API_modal_modal" */'./page/API/pages/modal/modal'),
          isIndex: false
        }, {
          path: '/page/API/pages/toast/toast',
          componentLoader: () => import( /* webpackChunkName: "page_API_toast_toast" */'./page/API/pages/toast/toast'),
          isIndex: false
        }, {
          path: '/page/API/pages/get-network-type/get-network-type',
          componentLoader: () => import( /* webpackChunkName: "page_API_get-network-type_get-network-type" */'./page/API/pages/get-network-type/get-network-type'),
          isIndex: false
        }, {
          path: '/page/API/pages/on-network-status-change/on-network-status-change',
          componentLoader: () => import( /* webpackChunkName: "page_API_on-network-status-change_on-network-status-change" */'./page/API/pages/on-network-status-change/on-network-status-change'),
          isIndex: false
        }, {
          path: '/page/API/pages/get-system-info/get-system-info',
          componentLoader: () => import( /* webpackChunkName: "page_API_get-system-info_get-system-info" */'./page/API/pages/get-system-info/get-system-info'),
          isIndex: false
        }, {
          path: '/page/API/pages/on-compass-change/on-compass-change',
          componentLoader: () => import( /* webpackChunkName: "page_API_on-compass-change_on-compass-change" */'./page/API/pages/on-compass-change/on-compass-change'),
          isIndex: false
        }, {
          path: '/page/API/pages/make-phone-call/make-phone-call',
          componentLoader: () => import( /* webpackChunkName: "page_API_make-phone-call_make-phone-call" */'./page/API/pages/make-phone-call/make-phone-call'),
          isIndex: false
        }, {
          path: '/page/API/pages/scan-code/scan-code',
          componentLoader: () => import( /* webpackChunkName: "page_API_scan-code_scan-code" */'./page/API/pages/scan-code/scan-code'),
          isIndex: false
        }, {
          path: '/page/API/pages/request/request',
          componentLoader: () => import( /* webpackChunkName: "page_API_request_request" */'./page/API/pages/request/request'),
          isIndex: false
        }, {
          path: '/page/API/pages/web-socket/web-socket',
          componentLoader: () => import( /* webpackChunkName: "page_API_web-socket_web-socket" */'./page/API/pages/web-socket/web-socket'),
          isIndex: false
        }, {
          path: '/page/API/pages/upload-file/upload-file',
          componentLoader: () => import( /* webpackChunkName: "page_API_upload-file_upload-file" */'./page/API/pages/upload-file/upload-file'),
          isIndex: false
        }, {
          path: '/page/API/pages/download-file/download-file',
          componentLoader: () => import( /* webpackChunkName: "page_API_download-file_download-file" */'./page/API/pages/download-file/download-file'),
          isIndex: false
        }, {
          path: '/page/API/pages/image/image',
          componentLoader: () => import( /* webpackChunkName: "page_API_image_image" */'./page/API/pages/image/image'),
          isIndex: false
        }, {
          path: '/page/API/pages/voice/voice',
          componentLoader: () => import( /* webpackChunkName: "page_API_voice_voice" */'./page/API/pages/voice/voice'),
          isIndex: false
        }, {
          path: '/page/API/pages/file/file',
          componentLoader: () => import( /* webpackChunkName: "page_API_file_file" */'./page/API/pages/file/file'),
          isIndex: false
        }, {
          path: '/page/API/pages/on-accelerometer-change/on-accelerometer-change',
          componentLoader: () => import( /* webpackChunkName: "page_API_on-accelerometer-change_on-accelerometer-change" */'./page/API/pages/on-accelerometer-change/on-accelerometer-change'),
          isIndex: false
        }, {
          path: '/page/API/pages/canvas/canvas',
          componentLoader: () => import( /* webpackChunkName: "page_API_canvas_canvas" */'./page/API/pages/canvas/canvas'),
          isIndex: false
        }, {
          path: '/page/API/pages/background-audio/background-audio',
          componentLoader: () => import( /* webpackChunkName: "page_API_background-audio_background-audio" */'./page/API/pages/background-audio/background-audio'),
          isIndex: false
        }, {
          path: '/page/API/pages/video/video',
          componentLoader: () => import( /* webpackChunkName: "page_API_video_video" */'./page/API/pages/video/video'),
          isIndex: false
        }, {
          path: '/page/API/pages/get-location/get-location',
          componentLoader: () => import( /* webpackChunkName: "page_API_get-location_get-location" */'./page/API/pages/get-location/get-location'),
          isIndex: false
        }, {
          path: '/page/API/pages/open-location/open-location',
          componentLoader: () => import( /* webpackChunkName: "page_API_open-location_open-location" */'./page/API/pages/open-location/open-location'),
          isIndex: false
        }, {
          path: '/page/API/pages/choose-location/choose-location',
          componentLoader: () => import( /* webpackChunkName: "page_API_choose-location_choose-location" */'./page/API/pages/choose-location/choose-location'),
          isIndex: false
        }, {
          path: '/page/API/pages/storage/storage',
          componentLoader: () => import( /* webpackChunkName: "page_API_storage_storage" */'./page/API/pages/storage/storage'),
          isIndex: false
        }, {
          path: '/page/component/pages/picker-view/picker-view',
          componentLoader: () => import( /* webpackChunkName: "page_component_picker-view_picker-view" */'./page/component/pages/picker-view/picker-view'),
          isIndex: false
        }, {
          path: '/page/component/pages/camera/camera',
          componentLoader: () => import( /* webpackChunkName: "page_component_camera_camera" */'./page/component/pages/camera/camera'),
          isIndex: false
        }, {
          path: '/page/component/pages/camera-scan-code/camera-scan-code',
          componentLoader: () => import( /* webpackChunkName: "page_component_camera-scan-code_camera-scan-code" */'./page/component/pages/camera-scan-code/camera-scan-code'),
          isIndex: false
        }, {
          path: '/page/API/pages/get-wxml-node-info/get-wxml-node-info',
          componentLoader: () => import( /* webpackChunkName: "page_API_get-wxml-node-info_get-wxml-node-info" */'./page/API/pages/get-wxml-node-info/get-wxml-node-info'),
          isIndex: false
        }, {
          path: '/page/component/pages/open-data/open-data',
          componentLoader: () => import( /* webpackChunkName: "page_component_open-data_open-data" */'./page/component/pages/open-data/open-data'),
          isIndex: false
        }, {
          path: '/page/component/pages/web-view/web-view',
          componentLoader: () => import( /* webpackChunkName: "page_component_web-view_web-view" */'./page/component/pages/web-view/web-view'),
          isIndex: false
        }, {
          path: '/page/API/pages/load-font-face/load-font-face',
          componentLoader: () => import( /* webpackChunkName: "page_API_load-font-face_load-font-face" */'./page/API/pages/load-font-face/load-font-face'),
          isIndex: false
        }, {
          path: '/page/API/pages/clipboard-data/clipboard-data',
          componentLoader: () => import( /* webpackChunkName: "page_API_clipboard-data_clipboard-data" */'./page/API/pages/clipboard-data/clipboard-data'),
          isIndex: false
        }, {
          path: '/page/API/pages/bluetooth/bluetooth',
          componentLoader: () => import( /* webpackChunkName: "page_API_bluetooth_bluetooth" */'./page/API/pages/bluetooth/bluetooth'),
          isIndex: false
        }, {
          path: '/page/API/pages/screen-brightness/screen-brightness',
          componentLoader: () => import( /* webpackChunkName: "page_API_screen-brightness_screen-brightness" */'./page/API/pages/screen-brightness/screen-brightness'),
          isIndex: false
        }, {
          path: '/page/API/pages/vibrate/vibrate',
          componentLoader: () => import( /* webpackChunkName: "page_API_vibrate_vibrate" */'./page/API/pages/vibrate/vibrate'),
          isIndex: false
        }, {
          path: '/page/API/pages/add-contact/add-contact',
          componentLoader: () => import( /* webpackChunkName: "page_API_add-contact_add-contact" */'./page/API/pages/add-contact/add-contact'),
          isIndex: false
        }, {
          path: '/page/API/pages/wifi/wifi',
          componentLoader: () => import( /* webpackChunkName: "page_API_wifi_wifi" */'./page/API/pages/wifi/wifi'),
          isIndex: false
        }, {
          path: '/page/API/pages/page-scroll/page-scroll',
          componentLoader: () => import( /* webpackChunkName: "page_API_page-scroll_page-scroll" */'./page/API/pages/page-scroll/page-scroll'),
          isIndex: false
        }, {
          path: '/page/API/pages/intersection-observer/intersection-observer',
          componentLoader: () => import( /* webpackChunkName: "page_API_intersection-observer_intersection-observer" */'./page/API/pages/intersection-observer/intersection-observer'),
          isIndex: false
        }, {
          path: '/page/API/pages/capture-screen/capture-screen',
          componentLoader: () => import( /* webpackChunkName: "page_API_capture-screen_capture-screen" */'./page/API/pages/capture-screen/capture-screen'),
          isIndex: false
        }, {
          path: '/page/API/pages/worker/worker',
          componentLoader: () => import( /* webpackChunkName: "page_API_worker_worker" */'./page/API/pages/worker/worker'),
          isIndex: false
        }, {
          path: '/page/API/pages/ibeacon/ibeacon',
          componentLoader: () => import( /* webpackChunkName: "page_API_ibeacon_ibeacon" */'./page/API/pages/ibeacon/ibeacon'),
          isIndex: false
        }, {
          path: '/page/API/pages/choose-address/choose-address',
          componentLoader: () => import( /* webpackChunkName: "page_API_choose-address_choose-address" */'./page/API/pages/choose-address/choose-address'),
          isIndex: false
        }, {
          path: '/page/API/pages/setting/setting',
          componentLoader: () => import( /* webpackChunkName: "page_API_setting_setting" */'./page/API/pages/setting/setting'),
          isIndex: false
        }, {
          path: '/page/API/pages/choose-invoice-title/choose-invoice-title',
          componentLoader: () => import( /* webpackChunkName: "page_API_choose-invoice-title_choose-invoice-title" */'./page/API/pages/choose-invoice-title/choose-invoice-title'),
          isIndex: false
        }, {
          path: '/page/API/pages/soter-authentication/soter-authentication',
          componentLoader: () => import( /* webpackChunkName: "page_API_soter-authentication_soter-authentication" */'./page/API/pages/soter-authentication/soter-authentication'),
          isIndex: false
        }, {
          path: '/page/component/pages/map-styles/map-styles',
          componentLoader: () => import( /* webpackChunkName: "page_component_map-styles_map-styles" */'./page/component/pages/map-styles/map-styles'),
          isIndex: false
        }, {
          path: '/page/cloud/index',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_index" */'./page/cloud/index'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/user-authentication/user-authentication',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_user-authentication_user-authentication" */'./page/cloud/pages/user-authentication/user-authentication'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/get-wx-context/get-wx-context',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_get-wx-context_get-wx-context" */'./page/cloud/pages/get-wx-context/get-wx-context'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/upload-file/upload-file',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_upload-file_upload-file" */'./page/cloud/pages/upload-file/upload-file'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/download-file/download-file',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_download-file_download-file" */'./page/cloud/pages/download-file/download-file'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/get-temp-file-url/get-temp-file-url',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_get-temp-file-url_get-temp-file-url" */'./page/cloud/pages/get-temp-file-url/get-temp-file-url'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/delete-file/delete-file',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_delete-file_delete-file" */'./page/cloud/pages/delete-file/delete-file'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/cloud-file-component/cloud-file-component',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_cloud-file-component_cloud-file-component" */'./page/cloud/pages/cloud-file-component/cloud-file-component'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/crud/crud',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_crud_crud" */'./page/cloud/pages/crud/crud'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/crud-detail/crud-detail',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_crud-detail_crud-detail" */'./page/cloud/pages/crud-detail/crud-detail'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/db-permission/db-permission',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_db-permission_db-permission" */'./page/cloud/pages/db-permission/db-permission'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/server-date/server-date',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_server-date_server-date" */'./page/cloud/pages/server-date/server-date'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/scf-database/scf-database',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_scf-database_scf-database" */'./page/cloud/pages/scf-database/scf-database'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/scf-storage/scf-storage',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_scf-storage_scf-storage" */'./page/cloud/pages/scf-storage/scf-storage'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/scf-openapi/scf-openapi',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_scf-openapi_scf-openapi" */'./page/cloud/pages/scf-openapi/scf-openapi'),
          isIndex: false
        }, {
          path: '/page/component/pages/doc-web-view/doc-web-view',
          componentLoader: () => import( /* webpackChunkName: "page_component_doc-web-view_doc-web-view" */'./page/component/pages/doc-web-view/doc-web-view'),
          isIndex: false
        }, {
          path: '/page/API/pages/doc-web-view/doc-web-view',
          componentLoader: () => import( /* webpackChunkName: "page_API_doc-web-view_doc-web-view" */'./page/API/pages/doc-web-view/doc-web-view'),
          isIndex: false
        }, {
          path: '/page/cloud/pages/doc-web-view/doc-web-view',
          componentLoader: () => import( /* webpackChunkName: "page_cloud_doc-web-view_doc-web-view" */'./page/cloud/pages/doc-web-view/doc-web-view'),
          isIndex: false
        }, {
          path: '/page/component/pages/editor/editor',
          componentLoader: () => import( /* webpackChunkName: "page_component_editor_editor" */'./page/component/pages/editor/editor'),
          isIndex: false
        }, {
          path: '/page/weui/example/index',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_index" */'./page/weui/example/index'),
          isIndex: false
        }, {
          path: '/page/weui/example/cell/cell',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_cell_cell" */'./page/weui/example/cell/cell'),
          isIndex: false
        }, {
          path: '/page/weui/example/slideview/slideview',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_slideview_slideview" */'./page/weui/example/slideview/slideview'),
          isIndex: false
        }, {
          path: '/page/weui/example/form/form',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_form_form" */'./page/weui/example/form/form'),
          isIndex: false
        }, {
          path: '/page/weui/example/uploader/uploader',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_uploader_uploader" */'./page/weui/example/uploader/uploader'),
          isIndex: false
        }, {
          path: '/page/weui/example/article/article',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_article_article" */'./page/weui/example/article/article'),
          isIndex: false
        }, {
          path: '/page/weui/example/badge/badge',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_badge_badge" */'./page/weui/example/badge/badge'),
          isIndex: false
        }, {
          path: '/page/weui/example/flex/flex',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_flex_flex" */'./page/weui/example/flex/flex'),
          isIndex: false
        }, {
          path: '/page/weui/example/footer/footer',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_footer_footer" */'./page/weui/example/footer/footer'),
          isIndex: false
        }, {
          path: '/page/weui/example/gallery/gallery',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_gallery_gallery" */'./page/weui/example/gallery/gallery'),
          isIndex: false
        }, {
          path: '/page/weui/example/grid/grid',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_grid_grid" */'./page/weui/example/grid/grid'),
          isIndex: false
        }, {
          path: '/page/weui/example/loadmore/loadmore',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_loadmore_loadmore" */'./page/weui/example/loadmore/loadmore'),
          isIndex: false
        }, {
          path: '/page/weui/example/loading/loading',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_loading_loading" */'./page/weui/example/loading/loading'),
          isIndex: false
        }, {
          path: '/page/weui/example/panel/panel',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_panel_panel" */'./page/weui/example/panel/panel'),
          isIndex: false
        }, {
          path: '/page/weui/example/preview/preview',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_preview_preview" */'./page/weui/example/preview/preview'),
          isIndex: false
        }, {
          path: '/page/weui/example/dialog/dialog',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_dialog_dialog" */'./page/weui/example/dialog/dialog'),
          isIndex: false
        }, {
          path: '/page/weui/example/msg/msg',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_msg_msg" */'./page/weui/example/msg/msg'),
          isIndex: false
        }, {
          path: '/page/weui/example/msg/msg_text',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_msg_msg_text" */'./page/weui/example/msg/msg_text'),
          isIndex: false
        }, {
          path: '/page/weui/example/msg/msg_text_primary',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_msg_msg_text_primary" */'./page/weui/example/msg/msg_text_primary'),
          isIndex: false
        }, {
          path: '/page/weui/example/msg/msg_success',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_msg_msg_success" */'./page/weui/example/msg/msg_success'),
          isIndex: false
        }, {
          path: '/page/weui/example/msg/msg_fail',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_msg_msg_fail" */'./page/weui/example/msg/msg_fail'),
          isIndex: false
        }, {
          path: '/page/weui/example/navbar/navbar',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_navbar_navbar" */'./page/weui/example/navbar/navbar'),
          isIndex: false
        }, {
          path: '/page/weui/example/navigation/navigation',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_navigation_navigation" */'./page/weui/example/navigation/navigation'),
          isIndex: false
        }, {
          path: '/page/weui/example/tabbar/tabbar',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_tabbar_tabbar" */'./page/weui/example/tabbar/tabbar'),
          isIndex: false
        }, {
          path: '/page/weui/example/icons/icons',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_icons_icons" */'./page/weui/example/icons/icons'),
          isIndex: false
        }, {
          path: '/page/weui/example/form-page/form-page',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_form-page_form-page" */'./page/weui/example/form-page/form-page'),
          isIndex: false
        }, {
          path: '/page/weui/example/half-screen-dialog/half-screen-dialog',
          componentLoader: () => import( /* webpackChunkName: "page_weui_example_half-screen-dialog_half-screen-dialog" */'./page/weui/example/half-screen-dialog/half-screen-dialog'),
          isIndex: false
        }]} tabBar={this.state.__tabs} customRoutes={{}} />
                
        </TabbarPanel>
        <Tabbar conf={this.state.__tabs} homePage="page/component/index" />
        </TabbarContainer>;
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

  componentWillMount() {
    Taro.initTabBarApis(this, Taro);
  }

}

export default App;
Nerv.render(<App />, document.getElementById('app'));