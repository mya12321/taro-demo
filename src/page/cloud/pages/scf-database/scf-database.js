import { Block, View, Image, Text, Icon, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './scf-database.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '云函数操作数据库',
      path: 'page/cloud/pages/scf-database/scf-database'
    }
  },

  data: {
    serverDataClient: '',
    serverDataClientError: false,
    serverDataCloud: '',
    serverDataCloudError: false,
    clientLoading: false,
    cloudLoading: false
  },

  queryServerDataViaClient() {
    const db = Taro.cloud.database()
    this.setData({
      clientLoading: true,
      serverDataClient: '',
      serverDataClientError: false
    })
    db.collection('perm4')
      .where({
        _openid: 'server'
      })
      .get({
        success: res => {
          const resFirstData = (res.data && res.data[0]) || {}
          this.setData({
            serverDataClient: resFirstData.data
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          this.setData({
            serverDataClientError: true
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          this.setData({
            clientLoading: false
          })
        }
      })
  },

  queryServerDataViaCloudFunction() {
    this.setData({
      cloudLoading: true,
      serverDataCloud: '',
      serverDataCloudError: false
    })
    Taro.cloud.callFunction({
      name: 'getServerDataDemo',
      data: {},
      success: res => {
        console.log('[云函数] [getServerDataDemo] res: ', res.result)
        const resFirstData = (res.result.data && res.result.data[0]) || {}
        this.setData({
          serverDataCloud: resFirstData.data
        })
      },
      fail: err => {
        this.setData({
          serverDataCloudError: true
        })
        console.error('[云函数] [getServerDataDemo] 调用失败', err)
      },
      complete: () => {
        this.setData({
          cloudLoading: false
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '云函数操作数据库'
  }

  render() {
    const {
      clientLoading,
      serverDataClient,
      serverDataClientError,
      cloudLoading,
      serverDataCloud,
      serverDataCloudError
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'Database' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells__title">
              <View>
                云函数为管理端，通过调用云函数可操作原先在小程序端无法操作的数据。
              </View>
              <View>后台流水数据：权限为仅管理端可写</View>
            </View>
            <View className="weui-cells weui-cells_after-title">
              <View className="page-body-info">
                <View className="progress-figure">
                  <Image
                    src={require('../../../API/resources/kind/device.png')}
                    className="progress-icon"
                  ></Image>
                  <Text
                    className={
                      'progress-line lg ' +
                      (clientLoading && 'pending') +
                      ' ' +
                      (serverDataClient && 'success') +
                      ' ' +
                      (serverDataClientError && 'fail')
                    }
                  ></Text>
                  <Image
                    src={require('../../resources/kind/database.png')}
                    className="progress-icon"
                  ></Image>
                </View>
                <View className="data-area">
                  {serverDataClient ? (
                    <View className="data-text">
                      <Icon type="success"></Icon>
                      <Text>获取成功</Text>
                    </View>
                  ) : (
                    serverDataClientError && (
                      <View className="data-text">
                        <Icon type="warn" color="#F43530"></Icon>
                        <Text>获取失败</Text>
                      </View>
                    )
                  )}
                </View>
                <View className="btn-area">
                  <Button
                    onClick={this.queryServerDataViaClient}
                    loading={clientLoading}
                  >
                    小程序端获取后台流水数据
                  </Button>
                </View>
              </View>
            </View>
            <View className="weui-cells__title"></View>
            <View className="weui-cells weui-cells_after-title">
              <View className="page-body-info">
                <View className="progress-figure">
                  <Image
                    src={require('../../../API/resources/kind/device.png')}
                    className="progress-icon"
                  ></Image>
                  <Text
                    className={
                      'progress-line ' +
                      (cloudLoading && 'pending') +
                      ' ' +
                      (serverDataCloud && 'success') +
                      ' ' +
                      (serverDataCloudError && 'fail')
                    }
                  ></Text>
                  <Image
                    src={require('../../resources/kind/scf.png')}
                    className="progress-icon"
                  ></Image>
                  <Text
                    className={
                      'progress-line ' +
                      (cloudLoading && 'pending') +
                      ' ' +
                      (serverDataCloud && 'success') +
                      ' ' +
                      (serverDataCloudError && 'fail')
                    }
                  ></Text>
                  <Image
                    src={require('../../resources/kind/database.png')}
                    className="progress-icon"
                  ></Image>
                </View>
                <View className="data-area">
                  {serverDataCloud ? (
                    <View className="data-text">
                      <Icon type="success"></Icon>
                      <Text>获取成功</Text>
                    </View>
                  ) : (
                    serverDataCloudError && (
                      <View className="data-text">
                        <Icon type="warn" color="#F43530"></Icon>
                        <Text>获取失败</Text>
                      </View>
                    )
                  )}
                </View>
                <View className="btn-area">
                  <Button
                    onClick={this.queryServerDataViaCloudFunction}
                    loading={cloudLoading}
                  >
                    调用云函数获取后台流水数据
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
} // 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-server-api/database/

export default _C
