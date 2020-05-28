import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './set-tab-bar.scss'
const defaultTabBarStyle = {
  color: '#7A7E83',
  selectedColor: '#3cc51f',
  backgroundColor: '#ffffff'
}

const defaultItemName = '接口'

@withWeapp({
  data: {
    hasSetTabBarBadge: false,
    hasShownTabBarRedDot: false,
    hasCustomedStyle: false,
    hasCustomedItem: false,
    hasHiddenTabBar: false
  },

  attached() {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },

  detached() {
    this.removeTabBarBadge()
    this.hideTabBarRedDot()
    this.showTabBar()
    this.removeCustomStyle()
    this.removeCustomItem()
  },

  methods: {
    navigateBack() {
      this.triggerEvent('unmount')
    },

    setTabBarBadge() {
      if (this.data.hasSetTabBarBadge) {
        this.removeTabBarBadge()
        return
      }
      this.setData({
        hasSetTabBarBadge: true
      })
      Taro.setTabBarBadge({
        index: 1,
        text: '1'
      })
    },

    removeTabBarBadge() {
      this.setData({
        hasSetTabBarBadge: false
      })
      Taro.removeTabBarBadge({
        index: 1
      })
    },

    showTabBarRedDot() {
      if (this.data.hasShownTabBarRedDot) {
        this.hideTabBarRedDot()
        return
      }
      this.setData({
        hasShownTabBarRedDot: true
      })
      Taro.showTabBarRedDot({
        index: 1
      })
    },

    hideTabBarRedDot() {
      this.setData({
        hasShownTabBarRedDot: false
      })
      Taro.hideTabBarRedDot({
        index: 1
      })
    },

    showTabBar() {
      this.setData({ hasHiddenTabBar: false })
      Taro.showTabBar()
    },

    hideTabBar() {
      if (this.data.hasHiddenTabBar) {
        this.showTabBar()
        return
      }
      this.setData({ hasHiddenTabBar: true })
      Taro.hideTabBar()
    },

    customStyle() {
      if (this.data.hasCustomedStyle) {
        this.removeCustomStyle()
        return
      }
      this.setData({ hasCustomedStyle: true })
      Taro.setTabBarStyle({
        color: '#FFF',
        selectedColor: '#1AAD19',
        backgroundColor: '#000000'
      })
    },

    removeCustomStyle() {
      this.setData({ hasCustomedStyle: false })
      Taro.setTabBarStyle(defaultTabBarStyle)
    },

    customItem() {
      if (this.data.hasCustomedItem) {
        this.removeCustomItem()
        return
      }
      this.setData({ hasCustomedItem: true })
      Taro.setTabBarItem({
        index: 1,
        text: 'API'
      })
    },

    removeCustomItem() {
      this.setData({ hasCustomedItem: false })
      Taro.setTabBarItem({
        index: 1,
        text: defaultItemName
      })
    }
  }
})
class _C extends Taro.Component {
  config = {
    component: true
  }

  render() {
    const {
      hasSetTabBarBadge,
      hasShownTabBarRedDot,
      hasCustomedStyle,
      hasCustomedItem,
      hasHiddenTabBar
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'tabBar' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area">
            <Button onClick={this.setTabBarBadge}>
              {!hasSetTabBarBadge ? '设置tab徽标' : '移除tab徽标'}
            </Button>
            <Button onClick={this.showTabBarRedDot}>
              {!hasShownTabBarRedDot ? '显示红点' : '移除红点'}
            </Button>
            <Button onClick={this.customStyle}>
              {!hasCustomedStyle ? '自定义Tab样式' : '移除自定义样式'}
            </Button>
            <Button onClick={this.customItem}>
              {!hasCustomedItem ? '自定义Tab信息' : '移除自定义信息'}
            </Button>
            <Button onClick={this.hideTabBar}>
              {!hasHiddenTabBar ? '隐藏TabBar' : '显示TabBar'}
            </Button>
          </View>
          <View className="btn-area">
            <Button type="primary" onClick={this.navigateBack}>
              返回上一级
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
