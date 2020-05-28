import { Block, View, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp({
  data: {
    list: [
      {
        id: 'form',
        name: '表单',
        open: false,
        pages: ['cell', 'slideview', 'form', 'uploader']
      },
      {
        id: 'widget',
        name: '基础组件',
        open: false,
        pages: [
          'article',
          'icons',
          'badge',
          'flex',
          'footer',
          'gallery',
          'grid',
          'loadmore',
          'loading',
          'panel',
          'preview'
        ]
      },
      {
        id: 'feedback',
        name: '操作反馈',
        open: false,
        pages: ['dialog', 'msg', 'half-screen-dialog', 'actionsheet']
      },
      {
        id: 'nav',
        name: '导航相关',
        open: false,
        pages: ['navigation', 'tabbar']
      },
      {
        id: 'search',
        name: '搜索相关',
        open: false,
        pages: ['searchbar']
      }
    ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    })
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { list } = this.data
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">小程序UI组件库</View>
          <View className="page__desc">
            小程序UI组件库是基于WeUI封装的组件库，是一套同微信原生视觉体验一致的组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。
          </View>
        </View>
        <View className="page__bd page__bd_spacing">
          <View className="kind-list">
            {list.map((item, index) => {
              return (
                <Block key="id">
                  <View className="kind-list__item">
                    <View
                      id={item.id}
                      className={
                        'weui-flex kind-list__item-hd ' +
                        (item.open ? 'kind-list__item-hd_show' : '')
                      }
                      onClick={this.kindToggle}
                    >
                      <View className="weui-flex__item">{item.name}</View>
                      <Image
                        className="kind-list__img"
                        src={'images/icon_nav_' + item.id + '.png'}
                      ></Image>
                    </View>
                    <View
                      className={
                        'kind-list__item-bd ' +
                        (item.open ? 'kind-list__item-bd_show' : '')
                      }
                    >
                      <View
                        className={
                          'weui-cells ' + (item.open ? 'weui-cells_show' : '')
                        }
                      >
                        {item.pages.map((page, index) => {
                          return (
                            <Block key="*this">
                              <Navigator
                                url={page + '/' + page}
                                className="weui-cell weui-cell_access"
                              >
                                <View className="weui-cell__bd">{page}</View>
                                <View className="weui-cell__ft weui-cell__ft_in-access"></View>
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
        <View className="page__ft">
          <Image
            src={require('./images/icon_footer.png')}
            style="width: 84px; height: 19px;"
          ></Image>
        </View>
      </View>
    )
  }
}

export default _C
