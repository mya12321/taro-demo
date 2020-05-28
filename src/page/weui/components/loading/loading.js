import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './loading.scss'
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
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 14))
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ 14: /***/ function(module, exports, __webpack_require__) {
      'use strict'
    }

    /******/
  }
)

@withWeapp({
  options: {
    addGlobalClass: true
  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: true,
      observer: function observer(newValue) {
        this._computedStyle(newValue, this.data.animated)
      }
    },
    animated: {
      type: Boolean,
      value: false,
      observer: function observer(newValue) {
        this._computedStyle(this.data.show, newValue)
      }
    },
    duration: {
      type: Number,
      value: 350
    },
    type: {
      type: String,
      value: 'dot-gray'
    },
    tips: {
      type: String,
      value: '加载中'
    }
  },
  data: {
    animationData: {},
    animationInstance: {},
    displayStyle: 'none'
  },
  methods: {
    _computedStyle: function _computedStyle(show, animated) {
      if (!show) {
        if (!animated) {
          this.setData({
            displayStyle: 'none'
          })
        } else {
          this._startAnimation()
        }
      } else {
        this.setData({
          displayStyle: ''
        })
      }
    },
    _startAnimation: function _startAnimation() {
      var _this = this

      setTimeout(function() {
        var data = _this.data
        var animation = data.animationInstance
        animation.height(0).step()
        _this.setData({
          animationData: animation.export()
        })
      }, 0)
    }
  },
  lifetimes: {
    attached: function attached() {
      var data = this.data
      var animationInstance = Taro.createAnimation({
        duration: data.duration,
        timingFunction: 'ease'
      })
      this.setData({ animationInstance: animationInstance })
      this._computedStyle(this.data.show, this.data.animated)
    }
  }
})
class _C extends Taro.Component {
  config = {
    component: true
  }

  render() {
    const { displayStyle, extClass, animationData, type, tips } = this.data
    return (
      <View
        style={'display:' + displayStyle + ';'}
        className={'wx_loading_view ' + extClass}
        animation={animationData}
        id="wx_loading_view"
      >
        {type === 'dot-white' ? (
          <View className="loading wx_dot_loading wx_dot_loading_white"></View>
        ) : type === 'dot-gray' ? (
          <View className="loading wx_dot_loading"></View>
        ) : (
          type === 'circle' && (
            <View className="weui-loadmore">
              <View className="weui-loading"></View>
              <View className="weui-loadmore__tips">{tips}</View>
            </View>
          )
        )}
      </View>
    )
  }
}

export default _C
