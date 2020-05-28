import { Block, View, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '小程序云开发展示',
      path: 'page/cloud/index'
    }
  },

  data: {
    list: [
      {
        id: 'user',
        name: '用户鉴权',
        open: false,
        pages: [
          {
            zh: '获取 OpenID',
            url: 'user-authentication/user-authentication'
          }
        ]
      },
      {
        id: 'database',
        name: '数据库',
        open: false,
        pages: [
          {
            zh: '基本操作',
            url: 'crud/crud'
          },
          {
            zh: '权限管理',
            url: 'db-permission/db-permission'
          },
          {
            zh: '服务端时间',
            url: 'server-date/server-date'
          }
        ]
      },
      {
        id: 'storage',
        name: '存储',
        open: false,
        pages: [
          {
            zh: '上传文件',
            url: 'upload-file/upload-file'
          },
          {
            zh: '下载文件',
            url: 'download-file/download-file'
          },
          {
            zh: '删除文件',
            url: 'delete-file/delete-file'
          },
          {
            zh: '换取临时链接',
            url: 'get-temp-file-url/get-temp-file-url'
          },
          {
            zh: '组件支持',
            url: 'cloud-file-component/cloud-file-component'
          }
        ]
      },
      {
        id: 'scf',
        name: '云函数',
        open: false,
        pages: [
          {
            zh: 'WXContext',
            url: 'get-wx-context/get-wx-context'
          },
          {
            zh: '数据库',
            url: 'scf-database/scf-database'
          },
          {
            zh: '存储',
            url: 'scf-storage/scf-storage'
          },
          {
            zh: '云调用',
            url: 'scf-openapi/scf-openapi'
          }
        ]
      }
    ]
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          Taro.navigateTo({
            url: 'pages/' + list[i].url
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '小程序云开发展示'
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
            以下将演示小程序云开发能力，具体属性参数详见
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
                <Block key={item.id}>
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
                        src={'resources/kind/' + item.id + '.png'}
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
                            <Block key="*item">
                              <Navigator
                                url={'pages/' + page.url}
                                className="navigator"
                              >
                                <View className="navigator-text">
                                  {page.zh}
                                </View>
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
