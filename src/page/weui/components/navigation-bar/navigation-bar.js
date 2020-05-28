import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './navigation-bar.scss'
module.exports = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 3))
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ 3: /***/ function(module, exports, __webpack_require__) {
      'use strict'
    }

    /******/
  }
)

@withWeapp({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    loading: {
      type: Boolean,
      value: false
    },
    animated: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: true,
      observer: '_showChange'
    },
    delta: {
      type: Number,
      value: 1
    }
  },
  data: {
    displayStyle: ''
  },
  attached: function attached() {
    var _this = this

    var isSupport = !!Taro.getMenuButtonBoundingClientRect
    var rect = Taro.getMenuButtonBoundingClientRect
      ? Taro.getMenuButtonBoundingClientRect()
      : null
    Taro.getSystemInfo({
      success: function success(res) {
        var ios = !!(res.system.toLowerCase().search('ios') + 1)
        _this.setData({
          ios: ios,
          statusBarHeight: res.statusBarHeight,
          innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
          innerPaddingRight: isSupport
            ? 'padding-right:' + (res.windowWidth - rect.left) + 'px'
            : '',
          leftWidth: isSupport
            ? 'width:' + (res.windowWidth - rect.left) + 'px'
            : ''
        })
      }
    })
  },

  methods: {
    _showChange: function _showChange(show) {
      var animated = this.data.animated
      var displayStyle = ''
      if (animated) {
        displayStyle =
          'opacity: ' +
          (show ? '1' : '0') +
          ';-webkit-transition:opacity 0.5s;transition:opacity 0.5s;'
      } else {
        displayStyle = 'display: ' + (show ? '' : 'none')
      }
      this.setData({
        displayStyle: displayStyle
      })
    },
    back: function back() {
      var data = this.data
      Taro.navigateBack({
        delta: data.delta
      })
      this.triggerEvent('back', { delta: data.delta }, {})
    }
  }
})
class _C extends Taro.Component {
  config = {
    component: true
  }

  render() {
    const {
      extClass,
      ios,
      statusBarHeight,
      color,
      background,
      displayStyle,
      innerPaddingRight,
      innerWidth,
      leftWidth,
      back,
      size,
      loading,
      title
    } = this.data
    return (
      <View className={'weui-navigation-bar ' + extClass}>
        <View
          className={
            'weui-navigation-bar__placeholder ' + (ios ? 'ios' : 'android')
          }
          style={'padding-top: ' + statusBarHeight + 'px;visibility: hidden;'}
        ></View>
        <View
          className={'weui-navigation-bar__inner ' + (ios ? 'ios' : 'android')}
          style={
            'padding-top: ' +
            statusBarHeight +
            'px; color: ' +
            color +
            ';background: ' +
            background +
            ';' +
            displayStyle +
            ';' +
            innerPaddingRight +
            ';' +
            innerWidth +
            ';'
          }
        >
          <View className="weui-navigation-bar__left" style={leftWidth}>
            {back ? (
              <Block>
                <View className="weui-navigation-bar__buttons">
                  <View
                    onClick={this.back}
                    className="weui-navigation-bar__button weui-navigation-bar__btn_goback"
                  ></View>
                </View>
              </Block>
            ) : (
              <Block>{this.props.renderLeft}</Block>
            )}
          </View>
          <View className="weui-navigation-bar__center">
            {loading && (
              <View className="weui-navigation-bar__loading">
                <View
                  className="weui-loading"
                  style={
                    'width:' + size.width + 'rpx;height:' + size.height + 'rpx;'
                  }
                ></View>
              </View>
            )}
            {title ? (
              <Block>
                <Text>{title}</Text>
              </Block>
            ) : (
              <Block>{this.props.renderCenter}</Block>
            )}
          </View>
          <View className="weui-navigation-bar__right">
            {this.props.renderRight}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
