import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './server-date.scss'
const util = require('../../../../util/util.js')

// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/database/db.serverDate.html

const app = Taro.getApp()
const collection = 'serverDate'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '服务端时间',
      path: 'page/cloud/pages/server-date/server-date'
    }
  },

  data: {
    openid: '',
    loading: false,
    clientDate: null,
    serverDate: null,
    clientDateFormatted: '',
    serverDateFormatted: '',
    delta: 0
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
          Taro.showToast({
            icon: 'none',
            title: '初始化失败，请检查网络'
          })
        })
    }
  },

  showError() {
    Taro.showToast({
      icon: 'none',
      title: '插入失败'
    })
  },

  completeTask() {
    this.setData({
      loading: false
    })
  },

  // 如果已有记录则更新，否则插入
  insertOrUpdateData(existedData, data) {
    const db = Taro.cloud.database()
    if (existedData._id) {
      db.collection(collection)
        .doc(existedData._id)
        .update({ data })
        .then(res => {
          this.setCompletedData(existedData._id)
          return res
        })
        .catch(err => {
          this.showError()
          console.error('[数据库] [更新记录] 失败：', err)
          this.completeTask()
        })
    } else {
      db.collection(collection)
        .add({ data })
        .then(res => {
          this.setCompletedData(res._id)
          return res
        })
        .catch(err => {
          this.showError()
          console.error('[数据库] [新增记录] 失败：', err)
          this.completeTask()
        })
    }
  },

  // 查询已插入/更新的数据中记录的服务端时间
  setCompletedData(id) {
    const db = Taro.cloud.database()
    db.collection(collection)
      .doc(id)
      .get()
      .then(res => {
        this.setData({
          delta: Math.abs(res.data.time - this.data.clientDate), // 大致的时间差
          serverDate: res.data.time, // 服务端时间
          clientDateFormatted: util.formatDateTime(this.data.clientDate, true),
          serverDateFormatted: util.formatDateTime(res.data.time, true)
        })
        Taro.showToast({
          title: '插入成功'
        })
        this.completeTask()
        return res
      })
      .catch(err => {
        this.showError()
        console.error('[数据库] [查询记录] 失败：', err)
        this.completeTask()
      })
  },

  insertData() {
    const db = Taro.cloud.database()
    const data = {
      time: db.serverDate()
    }
    this.setData({
      loading: true
    })
    db.collection(collection)
      .where({
        _openid: this.data.openid
      })
      .get()
      .then(res => {
        this.setData({
          clientDate: new Date() // 客户端时间
        })
        console.log('[数据库] [查询记录] 成功: ', res)
        const resFirstData = res.data[0] || {}
        this.insertOrUpdateData(resFirstData, data)
        return res
      })
      .catch(err => {
        this.showError()
        console.error('[数据库] [查询记录] 失败：', err)
        this.completeTask()
      })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '服务端时间'
  }

  render() {
    const {
      serverDate,
      clientDateFormatted,
      serverDateFormatted,
      delta,
      loading,
      openid
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'db.serverDate' }}></HeadTmpl>
        {openid && (
          <View className="page-body">
            <View className="page-section">
              <View className="page-body-info">
                <View className="page-body-title">服务端时间</View>
                {!serverDate ? (
                  <Block>
                    <Text className="page-body-text">
                      很多时候我们希望记录数据的创建时间
                    </Text>
                    <Text className="page-body-text">
                      在小程序端使用 Date
                      对象创建的是客户端时间（可被任意修改），而非服务端时间
                    </Text>
                    <Text className="page-body-text">
                      这时可以使用云开发提供的 serverDate
                      对象，在请求被处理时会自动转换成服务端时间
                    </Text>
                  </Block>
                ) : (
                  <Block>
                    <Block>
                      <Text className="page-body-text">客户端时间</Text>
                      <Text className="context-value">
                        {clientDateFormatted}
                      </Text>
                    </Block>
                    <Block>
                      <Text className="page-body-text">服务端时间</Text>
                      <Text className="context-value">
                        {serverDateFormatted}
                      </Text>
                    </Block>
                    <Block>
                      <Text className="page-body-text">时间差距</Text>
                      <Text className="context-value">{delta + ' 毫秒'}</Text>
                    </Block>
                  </Block>
                )}
              </View>
              <View className="btn-area">
                <Button
                  type="primary"
                  onClick={this.insertData}
                  loading={loading}
                >
                  插入数据
                </Button>
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
