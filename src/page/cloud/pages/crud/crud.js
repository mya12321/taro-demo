import { Block, View, Icon, Input, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './crud.scss'
// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html

const app = Taro.getApp()

@withWeapp({
  onShareAppMessage() {
    return {
      title: '基本操作',
      path: 'page/cloud/pages/crud/crud'
    }
  },

  data: {
    openid: '',
    todoListFetched: false,
    todoList: [],
    searchContent: '',
    newContent: '',
    filtered: false,
    loading: false
  },

  onLoad() {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
      this.queryTodoList()
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
          this.queryTodoList()
          return openid
        })
        .catch(err => {
          console.error(err)
          Taro.hideLoading()
          Taro.showToast({
            icon: 'none',
            title: '初始化失败，请检查网络'
          })
        })
    }
  },

  onShow() {
    if (this.data.openid) {
      this.queryTodoList()
    }
  },

  createTodo() {
    if (this.data.loading) {
      return
    }
    const { newContent } = this.data
    if (!newContent) {
      return
    }

    this.setData({ loading: true })
    const db = Taro.cloud.database()
    db.collection('todos').add({
      data: {
        description: newContent,
        done: false
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          todoList: [
            ...this.data.todoList,
            {
              _id: res._id,
              _openid: this.data.openid,
              description: newContent,
              done: false
            }
          ],
          newContent: ''
        })
        Taro.showToast({
          title: '新增记录成功'
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        Taro.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      },
      complete: () => {
        this.setData({ loading: false })
      }
    })
  },

  queryTodoList() {
    Taro.showLoading({
      title: '正在查询...'
    })
    const db = Taro.cloud.database()
    db.collection('todos')
      .where({
        _openid: this.data.openid
      })
      .get({
        success: res => {
          this.setData({
            todoListFetched: true,
            todoList: res.data,
            filtered: false
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          Taro.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          Taro.hideLoading()
        }
      })
  },

  searchTodo() {
    const { searchContent } = this.data
    if (!searchContent) {
      this.queryTodoList()
      return
    }

    const db = Taro.cloud.database()
    let descriptionCondition = searchContent
    const execResult = /^\/([\s\S]*)\//.exec(searchContent)
    if (execResult) {
      const reStr = execResult[1].trim().replace(/\s+/g, '|')
      descriptionCondition = db.RegExp({
        regexp: reStr
      })
    }
    Taro.showLoading({
      title: '正在查询...'
    })
    db.collection('todos')
      .where({
        _openid: this.data.openid,
        description: descriptionCondition
      })
      .get({
        success: res => {
          this.setData({
            todoList: res.data,
            filtered: true
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          Taro.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          Taro.hideLoading()
        }
      })
  },

  toggleComplete(e) {
    if (this.data.loading) {
      return
    }
    const { id: todoId, index } = e.currentTarget.dataset
    const todo = this.data.todoList[index]

    this.setData({ loading: true })
    const db = Taro.cloud.database()
    db.collection('todos')
      .doc(todoId)
      .update({
        data: { done: !todo.done },
        success: () => {
          this.setData({
            [`todoList[${index}].done`]: !todo.done
          })
        },
        fail: err => {
          Taro.showToast({
            icon: 'none',
            title: '更新失败'
          })
          console.error('[数据库] [更新记录] 失败：', err)
        },
        complete: () => {
          this.setData({ loading: false })
        }
      })
  },

  toDetail(e) {
    const { id: todoId } = e.currentTarget.dataset
    Taro.navigateTo({
      url: `/page/cloud/pages/crud-detail/crud-detail?todoId=${todoId}`
    })
  },

  onInputSearchContent(e) {
    this.setData({
      searchContent: e.detail.value
    })
  },

  onInputNewContent(e) {
    this.setData({
      newContent: e.detail.value
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '基本操作'
  }

  render() {
    const {
      searchContent,
      todoList,
      filtered,
      newContent,
      todoListFetched,
      openid
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'CRUD' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__hd" style="margin-right: 10rpx">
                  <Icon
                    className="weui-icon-checkbox_circle"
                    type="search"
                    size="20"
                  ></Icon>
                </View>
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    placeholder="精确搜索或使用正则表达式搜索"
                    value={searchContent}
                    onInput={this.onInputSearchContent}
                    onConfirm={this.searchTodo}
                  ></Input>
                </View>
              </View>
            </View>
            <View className="weui-cells__title">Todo List</View>
            {openid && (
              <View className="weui-cells weui-cells_after-title">
                {todoList.map((item, index) => {
                  return (
                    <View
                      key="_id"
                      className="weui-cell weui-cell_access"
                      hoverClass="weui-cell_active"
                      data-id={item._id}
                      onClick={this.toDetail}
                    >
                      <View
                        className="weui-cell__hd"
                        data-id={item._id}
                        data-index={index}
                        onClick={this.toggleComplete}
                        style="margin-right: 10rpx"
                      >
                        {!item.done ? (
                          <Icon
                            className="weui-icon-checkbox_circle"
                            type="circle"
                          ></Icon>
                        ) : (
                          <Icon
                            className="weui-icon-checkbox_success"
                            type="success"
                          ></Icon>
                        )}
                      </View>
                      <View className="weui-cell__bd">{item.description}</View>
                      <View className="weui-cell__ft weui-cell__ft_in-access"></View>
                    </View>
                  )
                })}
                {todoList.length < 5 && !filtered && (
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__bd">
                      <Input
                        className="weui-input"
                        placeholder="添加新的 Todo"
                        value={newContent}
                        focus={todoListFetched && !todoList.length}
                        onInput={this.onInputNewContent}
                        onConfirm={this.createTodo}
                      ></Input>
                    </View>
                  </View>
                )}
              </View>
            )}
            {!todoList.length && filtered && (
              <View className="page-body-info">
                <Text className="page-body-text">无数据</Text>
              </View>
            )}
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
