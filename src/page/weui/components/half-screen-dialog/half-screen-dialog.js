import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './half-screen-dialog.scss'
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
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 17))
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ 17: /***/ function(module, exports, __webpack_require__) {
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
    closabled: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: ''
    },
    subTitle: {
      type: String,
      value: ''
    },
    extClass: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    tips: {
      type: String,
      value: ''
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    mask: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false,
      observer: '_showChange'
    },
    buttons: {
      type: Array,
      value: []
    }
  },
  methods: {
    close: function close(e) {
      var type = e.currentTarget.dataset.type

      if (this.data.maskClosable || type === 'close') {
        this.setData({
          show: false
        })
        this.triggerEvent('close')
      }
    },
    buttonTap: function buttonTap(e) {
      var index = e.currentTarget.dataset.index

      this.triggerEvent(
        'buttontap',
        { index: index, item: this.data.buttons[index] },
        {}
      )
    }
  }
})
class _C extends Taro.Component {
  config = {
    component: true
  }

  render() {
    const {
      show,
      mask,
      extClass,
      closabled,
      title,
      subTitle,
      desc,
      tips,
      buttons
    } = this.data
    return (
      <View className={show ? 'weui-show' : 'weui-hidden'}>
        {mask && (
          <View
            className="weui-mask init"
            onClick={this.close}
            data-type="tap"
          ></View>
        )}
        <View className={'weui-half-screen-dialog ' + extClass}>
          <View className="weui-half-screen-dialog__hd">
            {closabled && (
              <View
                className="weui-half-screen-dialog__hd__side"
                onClick={this.close}
                data-type="close"
              >
                <View className="weui-icon-btn weui-icon-btn_close">关闭</View>
              </View>
            )}
            <View className="weui-half-screen-dialog__hd__main">
              {title ? (
                <Block>
                  <Text className="weui-half-screen-dialog__title">
                    {title}
                  </Text>
                  <Text className="weui-half-screen-dialog__subtitle">
                    {subTitle}
                  </Text>
                </Block>
              ) : (
                <Block>
                  <View className="weui-half-screen-dialog__title">
                    {this.props.renderTitle}
                  </View>
                </Block>
              )}
            </View>
            <View className="weui-half-screen-dialog__hd__side">
              <View className="weui-icon-btn weui-icon-btn_more">更多</View>
            </View>
          </View>
          <View className="weui-half-screen-dialog__bd">
            {title ? (
              <Block>
                <View className="weui-half-screen-dialog__desc">{desc}</View>
                <View className="weui-half-screen-dialog__tips">{tips}</View>
              </Block>
            ) : (
              this.props.renderDesc
            )}
          </View>
          <View className="weui-half-screen-dialog__ft">
            {buttons && buttons.length ? (
              <Block>
                {buttons.map((item, index) => {
                  return (
                    <Button
                      key={item.text + item.index}
                      type={item.type}
                      className={'weui-btn ' + item.className}
                      data-index={index}
                      onClick={this.buttonTap}
                    >
                      {item.text}
                    </Button>
                  )
                })}
                {/*  <view wx:for="{{buttons}}" class="weui-dialog__btn {{}} {{item.extClass}}"></view>  */}
              </Block>
            ) : (
              this.props.renderFooter
            )}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
