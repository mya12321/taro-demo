import { Block, View, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp({
  onShow() {
    Taro.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '小程序官方组件展示',
      path: 'page/component/index'
    }
  },

  data: {
    list: [
      {
        id: 'view',
        name: '视图容器',
        open: false,
        pages: ['view', 'scroll-view', 'swiper', 'movable-view', 'cover-view']
      },
      {
        id: 'content',
        name: '基础内容',
        open: false,
        pages: ['text', 'icon', 'progress', 'rich-text']
      },
      {
        id: 'form',
        name: '表单组件',
        open: false,
        pages: [
          'button',
          'checkbox',
          'form',
          'input',
          'label',
          'picker',
          'picker-view',
          'radio',
          'slider',
          'switch',
          'textarea',
          'editor'
        ]
      },
      {
        id: 'nav',
        name: '导航',
        open: false,
        pages: ['navigator']
      },
      {
        id: 'media',
        name: '媒体组件',
        open: false,
        pages: ['image', 'audio', 'video', 'camera']
      },
      {
        id: 'map',
        name: '地图',
        open: false,
        pages: ['map']
      },
      {
        id: 'canvas',
        name: '画布',
        open: false,
        pages: ['canvas']
      },
      {
        id: 'open',
        name: '开放能力',
        open: false,
        pages: ['ad', 'open-data', 'web-view']
      }
    ]
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    Taro.reportAnalytics('click_view_programmatically', {})
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '小程序官方组件展示'
  }

  render() {
    const { list } = this.data
    return (
      <View className="index">
        <View className="index-hd">
          <Image
            className="index-logo"
            src={require('./resources/kind/logo.png')}
          ></Image>
          <View className="index-desc">
            以下将展示小程序官方组件能力，组件样式仅供参考，开发者可根据自身需求自定义组件样式，具体属性参数详见
            <Navigator
              url="pages/doc-web-view/doc-web-view"
              className="weui-agree__link"
            >
              小程序开发文档
            </Navigator>
            。
          </View>
        </View>
        <View className="index-bd">
          <View className="kind-list">
            {list.map((item, index) => {
              return (
                <Block key="id">
                  <View className="kind-list-item">
                    <View
                      id={item.id}
                      className={
                        'kind-list-item-hd ' +
                        (item.open ? 'kind-list-item-hd-show' : '')
                      }
                      onClick={this.kindToggle}
                    >
                      <View className="kind-list-text">{item.name}</View>
                      <Image
                        className="kind-list-img"
                        src={require('./resources/kind/' + item.id + '.png')}
                      ></Image>
                    </View>
                    <View
                      className={
                        'kind-list-item-bd ' +
                        (item.open ? 'kind-list-item-bd-show' : '')
                      }
                    >
                      <View
                        className={
                          'navigator-box ' +
                          (item.open ? 'navigator-box-show' : '')
                        }
                      >
                        {item.pages.map((page, index) => {
                          return (
                            <Block key="*this">
                              <Navigator
                                url={'pages/' + page + '/' + page}
                                className="navigator"
                              >
                                <View className="navigator-text">{page}</View>
                                <View className="navigator-arrow"></View>
                              </Navigator>
                            </Block>
                          )
                        })}
                      </View>
                    </View>
                  </View>
                </Block>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
