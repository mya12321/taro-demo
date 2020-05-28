import { Block, View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './crud-detail.scss'
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
    todoId: '',
    description: '',
    done: false,
    updating: false,
    deleting: false
  },

  onLoad(options) {
    const { todoId } = options
    this.setData({
      todoId
    })
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
      this.queryTodo()
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
          this.queryTodo()
          return openid
        })
        .catch(err => {
          console.error(err)
          Taro.hideLoading()
        })
    }
  },

  queryTodo() {
    Taro.showLoading({
      title: '正在查询...'
    })
    const db = Taro.cloud.database()
    db.collection('todos')
      .doc(this.data.todoId)
      .get({
        success: res => {
          this.setData({
            description: res.data.description,
            done: res.data.done
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

  updateTodo() {
    if (this.data.updating || !this.data.todoId) {
      return
    }
    const { todoId, description } = this.data
    if (!description) {
      return
    }

    this.setData({ updating: true })
    const db = Taro.cloud.database()
    db.collection('todos')
      .doc(todoId)
      .update({
        data: {
          description
        },
        success: () => {
          console.log('he')
          Taro.showToast({
            title: '更新成功'
          })
          Taro.navigateBack()
        },
        fail: err => {
          Taro.showToast({
            icon: 'none',
            title: '更新失败'
          })
          console.error('[数据库] [更新记录] 失败：', err)
        },
        complete: () => {
          this.setData({ updating: false })
        }
      })
  },

  removeTodo() {
    if (this.data.deleting || !this.data.todoId) {
      return
    }
    const { todoId } = this.data

    this.setData({ deleting: true })
    const db = Taro.cloud.database()
    db.collection('todos')
      .doc(todoId)
      .remove({
        success: () => {
          Taro.showToast({
            title: '删除成功'
          })
          Taro.navigateBack()
        },
        fail: err => {
          Taro.showToast({
            icon: 'none',
            title: '删除失败'
          })
          console.error('[数据库] [删除记录] 失败：', err)
        },
        complete: () => {
          this.setData({ deleting: false })
        }
      })
  },

  onInputContent(e) {
    this.setData({
      description: e.detail.value
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '基本操作'
  }

  render() {
    const { description, updating, deleting } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'CRUD' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells__title">内容</View>
            <View className="weui-cells weui-cells_after-title">
              <View className="weui-cell weui-cell_input">
                <View className="weui-cell__bd">
                  <Input
                    className="weui-input"
                    placeholder="请输入内容"
                    value={description}
                    onInput={this.onInputContent}
                  ></Input>
                </View>
              </View>
            </View>
            <View className="btn-area">
              <Button
                type="primary"
                size="40"
                onClick={this.updateTodo}
                loading={updating}
              >
                更新 Todo
              </Button>
              <Button
                type="warn"
                size="40"
                onClick={this.removeTodo}
                loading={deleting}
              >
                删除 Todo
              </Button>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
