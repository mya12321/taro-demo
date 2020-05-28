import { Block, View, Picker, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './db-permission.scss'
// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/permission.html

const app = Taro.getApp()

const sliderWidth = 96

@withWeapp({
  onShareAppMessage() {
    return {
      title: '权限管理',
      path: 'page/cloud/pages/db-permission/db-permission'
    }
  },

  data: {
    openid: '',
    permissions: [
      '仅创建者可写，所有人可读',
      '仅创建者可读写',
      '仅管理端可写，所有人可读',
      '仅管理端可读写'
    ],
    currentPermissionIndex: 0,
    tabs: [
      ['我的个性签名', '阿白的个性签名'],
      ['我的邮箱', '阿绿的邮箱'],
      [],
      []
    ],
    activeTabIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    querying: false,
    updating: false,

    hasMyWhatsUp: false,
    myWhatsUp: '',
    adminWhatsUp: '',
    myEmail: '',
    adminEmail: '',
    hasProduct: false,
    product: {},
    serverData: ''
  },

  onLoad() {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    } else {
      Taro.showLoading({
        title: '正在初始化...'
      })
      app
        .getUserOpenIdViaCloud()
        .then(openid => {
          this.setData({
            openid
          })
          Taro.hideLoading()
          return openid
        })
        .catch(err => {
          console.error(err)
          Taro.hideLoading()
          Taro.showModal({
            content: '初始化失败，请检查网络',
            showCancel: false
          })
        })
    }
    const { myWhatsUp, adminWhatsUp, myEmail, adminEmail } = app.globalData
    this.setData({
      hasMyWhatsUp: !!myWhatsUp,
      myWhatsUp: myWhatsUp || '',
      adminWhatsUp: adminWhatsUp || '',
      myEmail: myEmail || '',
      adminEmail: adminEmail || ''
    })

    this.initTabs()
  },

  initTabs() {
    const currentPermissionIndex = this.data.currentPermissionIndex
    const tabLength = this.data.tabs[currentPermissionIndex].length
    const that = this
    Taro.getSystemInfo({
      success(res) {
        that.setData({
          sliderLeft: (res.windowWidth / tabLength - sliderWidth) / 2,
          sliderOffset: (res.windowWidth / tabLength) * that.data.activeTabIndex
        })
      }
    })
  },

  onTabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeTabIndex: Number(e.currentTarget.id)
    })
  },

  onPermissionChange(e) {
    const oldIndex = this.data.currentPermissionIndex
    const newIndex = Number(e.detail.value)
    if (oldIndex !== newIndex) {
      this.setData({
        currentPermissionIndex: Number(newIndex),
        activeTabIndex: 0
      })
      this.initTabs()
    }
  },

  bindInput(e) {
    const { name } = e.currentTarget.dataset
    this.setData({
      [name]: e.detail.value
    })
  },

  showErrorModal(name, err) {
    let errMsg = name + '失败'
    if (err.toString().indexOf('permission denied') >= 0) {
      errMsg += '：无权限操作'
    }
    Taro.showModal({
      content: errMsg,
      showCancel: false
    })
  },

  // 根据 openid 获取第一条数据
  queryOneByOpenId(
    collection,
    openid,
    options = {
      showLoading: false,
      showError: false,
      success: null,
      fail: null
    }
  ) {
    const {
      showLoading,
      showError,
      success: successCallback,
      fail: failCallback
    } = options
    if (showLoading) {
      this.setData({
        querying: true
      })
    }
    const db = Taro.cloud.database()
    const _openid = openid || this.data.openid
    db.collection(collection)
      .where({
        _openid
      })
      .get({
        success: res => {
          console.log('[数据库] [查询记录] 成功: ', res)
          const resFirstData = res.data[0] || {}
          // 返回的不是要查询用户的记录，是由于没有读权限，视为查询失败
          if (resFirstData._openid && resFirstData._openid !== _openid) {
            const err = new Error('database permission denied')
            if (showError) this.showErrorModal('获取', err)
            if (failCallback) failCallback.call(this, err)
          } else if (successCallback) {
            successCallback.call(this, res.data[0])
          }
        },
        fail: err => {
          if (showError) this.showErrorModal('获取', err)
          console.error('[数据库] [查询记录] 失败：', err)
          if (failCallback) failCallback.call(this, err)
        },
        complete: () => {
          if (showLoading) {
            this.setData({
              querying: false
            })
          }
        }
      })
  },

  // 根据 openid 更新数据
  updateOneByOpenId(
    collection,
    openid,
    data,
    options = {
      showLoading: false,
      showError: false,
      success: null,
      fail: null
    }
  ) {
    const {
      showLoading,
      showError,
      success: successCallback,
      fail: failCallback
    } = options
    if (showLoading) {
      this.setData({
        updating: true
      })
    }
    const db = Taro.cloud.database()
    // 限制每人仅存一条记录，先查询是否已存在记录
    this.queryOneByOpenId(collection, openid || '', {
      success: dbData => {
        if (dbData) {
          // 已有数据，进行更新操作
          db.collection(collection)
            .doc(dbData._id)
            .update({
              data,
              success: res => {
                console.log('[数据库] [更新记录] 成功: ', res)
                if (successCallback) successCallback.call(this, res.stats)
              },
              fail: err => {
                if (showError) this.showErrorModal('设置', err)
                console.error('[数据库] [更新记录] 失败：', err)
                if (failCallback) failCallback.call(this, err)
              },
              complete: () => {
                if (showLoading) {
                  this.setData({
                    updating: false
                  })
                }
              }
            })
        } else if (!openid || openid === this.data.openid) {
          // 还没有插入过数据且要操作的是自己的数据，进行新增操作
          db.collection(collection).add({
            data,
            success: res => {
              console.log('[数据库] [新增记录] 成功：', res)
              if (successCallback) successCallback.call(this, { _id: res._id })
            },
            fail: err => {
              if (showError) this.showErrorModal('设置', err)
              console.error('[数据库] [新增记录] 失败：', err)
              if (failCallback) failCallback.call(this, err)
            },
            complete: () => {
              if (showLoading) {
                this.setData({
                  updating: false
                })
              }
            }
          })
        } else {
          const err = new Error('database permission denied')
          if (showError) this.showErrorModal('设置', err)
          if (failCallback) failCallback.call(this, err)
          if (showLoading) {
            this.setData({
              updating: false
            })
          }
        }
      },
      fail: err => {
        if (showError) this.showErrorModal('设置', err)
        if (failCallback) failCallback.call(this, err)
        if (showLoading) {
          this.setData({
            updating: false
          })
        }
      }
    })
  },

  // perm1：仅创建者可写，所有人可读

  queryMyWhatsUp() {
    this.queryOneByOpenId('perm1', '', {
      showLoading: true,
      showError: true,
      success: data => {
        const content = (data && data.whatsUp) || ''
        Taro.showModal({
          title: '获取成功',
          content: content ? '个性签名为：' + content : '个性签名为空',
          showCancel: false
        })
      }
    })
  },

  updateMyWhatsUp() {
    const data = {
      whatsUp: this.data.myWhatsUp
    }
    this.updateOneByOpenId('perm1', '', data, {
      showLoading: true,
      showError: true,
      success: () => {
        app.globalData.myWhatsUp = this.data.myWhatsUp
        this.setData({
          hasMyWhatsUp: true
        })
        Taro.showModal({
          content: '设置成功',
          showCancel: false
        })
      }
    })
  },

  queryAdminWhatsUp() {
    this.queryOneByOpenId('perm1', 'kiki', {
      showLoading: true,
      showError: true,
      success: data => {
        const content = (data && data.whatsUp) || ''
        Taro.showModal({
          title: '获取成功',
          content: content ? '个性签名为：' + content : '个性签名为空',
          showCancel: false
        })
      }
    })
  },

  updateAdminWhatsUp() {
    const data = {
      whatsUp: this.data.adminWhatsUp
    }
    this.updateOneByOpenId('perm1', 'kiki', data, {
      showLoading: true,
      showError: true,
      success: res => {
        if (res.updated === 0) {
          Taro.showModal({
            content: '设置失败：无权限操作',
            showCancel: false
          })
        } else {
          app.globalData.adminWhatsUp = this.data.adminWhatsUp
          Taro.showModal({
            content: '设置成功',
            showCancel: false
          })
        }
      }
    })
  },

  // perm2：仅创建者可读写

  queryMyEmail() {
    this.queryOneByOpenId('perm2', '', {
      showLoading: true,
      showError: true,
      success: data => {
        const content = (data && data.email) || ''
        Taro.showModal({
          title: '获取成功',
          content: content ? '邮箱为：' + content : '邮箱为空',
          showCancel: false
        })
      }
    })
  },

  updateMyEmail() {
    const data = {
      email: this.data.myEmail
    }
    this.updateOneByOpenId('perm2', '', data, {
      showLoading: true,
      showError: true,
      success: () => {
        app.globalData.myEmail = this.data.myEmail
        Taro.showModal({
          content: '设置成功',
          showCancel: false
        })
      }
    })
  },

  queryAdminEmail() {
    this.queryOneByOpenId('perm2', 'popo', {
      showLoading: true,
      showError: true,
      success: data => {
        const content = (data && data.email) || ''
        Taro.showModal({
          title: '获取成功',
          content: content ? '邮箱为：' + content : '邮箱为空',
          showCancel: false
        })
      }
    })
  },

  updateAdminEmail() {
    const data = {
      email: this.data.adminEmail
    }
    this.updateOneByOpenId('perm2', 'popo', data, {
      showLoading: true,
      showError: true,
      success: () => {
        app.globalData.adminEmail = this.data.adminEmail
        Taro.showModal({
          content: '设置成功',
          showCancel: false
        })
      }
    })
  },

  // perm3：仅管理端可写，所有人可读

  queryProduct() {
    this.queryOneByOpenId('perm3', 'admin', {
      showLoading: true,
      showError: true,
      success: data => {
        const price = (data && data.price) || null
        Taro.showModal({
          title: '获取成功',
          content: price !== null ? '商品价格为：' + price : '商品价格暂未设置',
          showCancel: false
        })
      }
    })
  },

  updateProductPrice() {
    const data = {
      price: parseInt(this.data.product.price, 10)
    }
    this.updateOneByOpenId('perm3', 'admin', data, {
      showLoading: true,
      showError: true,
      success: () => {
        Taro.showModal({
          content: '设置成功',
          showCancel: false
        })
      }
    })
  },

  // perm4：仅管理端可读写

  queryServerData() {
    this.queryOneByOpenId('perm4', 'server', {
      showLoading: true,
      showError: true,
      success: data => {
        const content = (data && data.serverData) || ''
        Taro.showModal({
          title: '获取成功',
          content: content ? '后台流水数据为：' + content : '后台流水数据为空',
          showCancel: false
        })
      }
    })
  },

  updateServerData() {
    const data = {
      data: this.data.serverData
    }
    this.updateOneByOpenId('perm4', 'server', data, {
      showLoading: true,
      showError: true,
      success: () => {
        Taro.showModal({
          content: '设置成功',
          showCancel: false
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '权限管理'
  }

  render() {
    const {
      currentPermissionIndex,
      permissions,
      tabs,
      activeTabIndex,
      sliderLeft,
      sliderOffset,
      myWhatsUp,
      hasMyWhatsUp,
      updating,
      querying,
      adminWhatsUp,
      myEmail,
      adminEmail,
      product,
      serverData,
      openid
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'Permission' }}></HeadTmpl>
        {openid && (
          <View className="page-body">
            <View className="page-section">
              <View className="weui-cells weui-cells_after-title">
                <View className="weui-cell weui-cell_select">
                  <View className="weui-cell__hd weui-cell__hd_in-select-after">
                    <View className="weui-label">权限类型</View>
                  </View>
                  <View className="weui-cell__bd">
                    <Picker
                      onChange={this.onPermissionChange}
                      value={currentPermissionIndex}
                      range={permissions}
                    >
                      <View
                        className="weui-select permission-select"
                        weuiSelectInSelectAfter
                      >
                        {permissions[currentPermissionIndex]}
                      </View>
                    </Picker>
                  </View>
                </View>
              </View>
              <View className="weui-panel">
                <View className="weui-panel__bd">
                  {currentPermissionIndex === 0 ? (
                    <Block>
                      <View className="weui-tab">
                        <View className="weui-navbar">
                          {tabs[currentPermissionIndex].map((item, index) => {
                            return (
                              <Block key="*this">
                                <View
                                  id={index}
                                  className={
                                    'weui-navbar__item ' +
                                    (activeTabIndex === index
                                      ? 'weui-bar__item_on'
                                      : '')
                                  }
                                  onClick={this.onTabClick}
                                >
                                  <View className="weui-navbar__title">
                                    {item}
                                  </View>
                                </View>
                              </Block>
                            )
                          })}
                          <View
                            className="weui-navbar__slider"
                            style={
                              'left: ' +
                              sliderLeft +
                              'px; transform: translateX(' +
                              sliderOffset +
                              'px); -webkit-transform: translateX(' +
                              sliderOffset +
                              'px);'
                            }
                          ></View>
                        </View>
                        <View className="weui-tab__panel">
                          <View
                            className="weui-tab__content"
                            hidden={activeTabIndex !== 0}
                          >
                            <View className="weui-cells weui-cells_after-title input-area">
                              <View className="weui-cell weui-cell_input">
                                <View className="weui-cell__bd">
                                  <Input
                                    className="weui-input"
                                    placeholder="请输入个性签名"
                                    value={myWhatsUp}
                                    focus={!hasMyWhatsUp}
                                    data-name="myWhatsUp"
                                    onInput={this.bindInput}
                                    onConfirm={this.updateMyWhatsUp}
                                  ></Input>
                                </View>
                              </View>
                            </View>
                            <View className="btn-area">
                              <Button
                                type="primary"
                                onClick={this.updateMyWhatsUp}
                                loading={updating}
                              >
                                设置个性签名
                              </Button>
                              <Button
                                onClick={this.queryMyWhatsUp}
                                loading={querying}
                              >
                                获取个性签名
                              </Button>
                            </View>
                          </View>
                          <View
                            className="weui-tab__content"
                            hidden={activeTabIndex !== 1}
                          >
                            <View className="weui-cells weui-cells_after-title input-area">
                              <View className="weui-cell weui-cell_input">
                                <View className="weui-cell__bd">
                                  <Input
                                    className="weui-input"
                                    placeholder="请输入个性签名"
                                    value={adminWhatsUp}
                                    data-name="adminWhatsUp"
                                    onInput={this.bindInput}
                                  ></Input>
                                </View>
                              </View>
                            </View>
                            <View className="btn-area">
                              <Button
                                type="primary"
                                onClick={this.updateAdminWhatsUp}
                                loading={updating}
                              >
                                设置个性签名
                              </Button>
                              <Button
                                onClick={this.queryAdminWhatsUp}
                                loading={querying}
                              >
                                获取个性签名
                              </Button>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Block>
                  ) : currentPermissionIndex === 1 ? (
                    <Block>
                      <View className="weui-tab">
                        <View className="weui-navbar">
                          {tabs[currentPermissionIndex].map((item, index) => {
                            return (
                              <Block key="*this">
                                <View
                                  id={index}
                                  className={
                                    'weui-navbar__item ' +
                                    (activeTabIndex === index
                                      ? 'weui-bar__item_on'
                                      : '')
                                  }
                                  onClick={this.onTabClick}
                                >
                                  <View className="weui-navbar__title">
                                    {item}
                                  </View>
                                </View>
                              </Block>
                            )
                          })}
                          <View
                            className="weui-navbar__slider"
                            style={
                              'left: ' +
                              sliderLeft +
                              'px; transform: translateX(' +
                              sliderOffset +
                              'px); -webkit-transform: translateX(' +
                              sliderOffset +
                              'px);'
                            }
                          ></View>
                        </View>
                        <View className="weui-tab__panel">
                          <View
                            className="weui-tab__content"
                            hidden={activeTabIndex !== 0}
                          >
                            <View className="weui-cells weui-cells_after-title input-area">
                              <View className="weui-cell weui-cell_input">
                                <View className="weui-cell__bd">
                                  <Input
                                    className="weui-input"
                                    placeholder="请输入邮箱"
                                    value={myEmail}
                                    data-name="myEmail"
                                    onInput={this.bindInput}
                                  ></Input>
                                </View>
                              </View>
                            </View>
                            <View className="btn-area">
                              <Button
                                type="primary"
                                onClick={this.updateMyEmail}
                                loading={updating}
                              >
                                设置邮箱
                              </Button>
                              <Button
                                onClick={this.queryMyEmail}
                                loading={querying}
                              >
                                获取邮箱
                              </Button>
                            </View>
                          </View>
                          <View
                            className="weui-tab__content"
                            hidden={activeTabIndex !== 1}
                          >
                            <View className="weui-cells weui-cells_after-title input-area">
                              <View className="weui-cell weui-cell_input">
                                <View className="weui-cell__bd">
                                  <Input
                                    className="weui-input"
                                    placeholder="请输入邮箱"
                                    value={adminEmail}
                                    data-name="adminEmail"
                                    onInput={this.bindInput}
                                  ></Input>
                                </View>
                              </View>
                            </View>
                            <View className="btn-area">
                              <Button
                                type="primary"
                                onClick={this.updateAdminEmail}
                                loading={updating}
                              >
                                设置邮箱
                              </Button>
                              <Button
                                onClick={this.queryAdminEmail}
                                loading={querying}
                              >
                                获取邮箱
                              </Button>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Block>
                  ) : currentPermissionIndex === 2 ? (
                    <Block>
                      <View>
                        <View className="weui-cells weui-cells_after-title input-area">
                          <View className="weui-cell weui-cell_input">
                            <View className="weui-cell__bd">
                              <Input
                                className="weui-input"
                                placeholder="请输入商品价格"
                                value={product.price}
                                data-name="product.price"
                                onInput={this.bindInput}
                              ></Input>
                            </View>
                          </View>
                        </View>
                        <View className="btn-area">
                          <Button
                            type="primary"
                            onClick={this.updateProductPrice}
                            loading={updating}
                          >
                            设置商品价格
                          </Button>
                          <Button
                            onClick={this.queryProduct}
                            loading={querying}
                          >
                            获取商品价格
                          </Button>
                        </View>
                      </View>
                    </Block>
                  ) : (
                    currentPermissionIndex === 3 && (
                      <Block>
                        <View>
                          <View className="weui-cells weui-cells_after-title input-area">
                            <View className="weui-cell weui-cell_input">
                              <View className="weui-cell__bd">
                                <Input
                                  className="weui-input"
                                  placeholder="请输入后台流水数据"
                                  value={serverData}
                                  data-name="serverData"
                                  onInput={this.bindInput}
                                ></Input>
                              </View>
                            </View>
                          </View>
                          <View className="btn-area">
                            <Button
                              type="primary"
                              onClick={this.updateServerData}
                              loading={updating}
                            >
                              设置后台流水数据
                            </Button>
                            <Button
                              onClick={this.queryServerData}
                              loading={querying}
                            >
                              获取后台流水数据
                            </Button>
                          </View>
                        </View>
                      </Block>
                    )
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
