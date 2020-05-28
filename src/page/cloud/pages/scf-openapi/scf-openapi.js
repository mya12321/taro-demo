import {
  Block,
  View,
  Image,
  Text,
  Icon,
  Form,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './scf-openapi.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: '云函数中使用微信开放能力',
      path: 'page/cloud/pages/scf-openapi/scf-openapi'
    }
  },

  data: {
    sendTemplateMessageResult: '',
    sendTemplateMessageError: false,
    getWXACodeResult: '',
    getWXACodeError: false,
    sendTemplateMessageLoading: false,
    getWXACodeLoading: false
  },

  sendTemplateMessageViaCloudFunction(e) {
    this.setData({
      sendTemplateMessageResult: '',
      sendTemplateMessageError: false,
      sendTemplateMessageLoading: true
    })
    Taro.cloud
      .callFunction({
        name: 'openapi',
        data: {
          action: 'sendTemplateMessage',
          formId: e.detail.formId
        }
        // eslint-disable-next-line
      })
      .then(res => {
        this.setData({
          sendTemplateMessageResult: res,
          sendTemplateMessageLoading: false
        })
        console.log('[云调用] [发送模板消息] 成功: ', res)
      })
      .catch(err => {
        this.setData({
          sendTemplateMessageError: true,
          sendTemplateMessageLoading: false
        })
        console.error('[云调用] [发送模板消息] 失败: ', err)
      })
  },

  getWXACodeViaCloudFunction() {
    this.setData({
      getWXACodeResult: '',
      getWXACodeError: false,
      getWXACodeLoading: true
    })
    Taro.cloud
      .callFunction({
        name: 'openapi',
        data: {
          action: 'getWXACode'
          // eslint-disable-next-line
        }
      })
      .then(res => {
        this.setData({
          getWXACodeResult: res,
          getWXACodeLoading: false
        })
        console.log('[云调用] [获取小程序码]] 成功: ', res)
      })
      .catch(err => {
        this.setData({
          getWXACodeError: true,
          getWXACodeLoading: false
        })
        console.error('[云调用] [获取小程序码] 失败: ', err)
      })
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
    navigationBarTitleText: '云调用'
  }

  render() {
    const {
      sendTemplateMessageLoading,
      sendTemplateMessageResult,
      sendTemplateMessageError,
      cloudLoading,
      getWXACodeLoading,
      getWXACodeResult,
      getWXACodeError
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: '云函数中使用微信开放能力' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section">
            <View className="weui-cells__title">
              <View>
                云调用是云开发提供的基于云函数使用小程序开放接口的能力
              </View>
            </View>
            <View className="weui-cells__title">
              <View>发送模板消息需在手机上测试</View>
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
                      'progress-line ' +
                      (sendTemplateMessageLoading && 'pending') +
                      ' ' +
                      (sendTemplateMessageResult && 'success') +
                      ' ' +
                      (sendTemplateMessageError && 'fail')
                    }
                  ></Text>
                  <Image
                    src={require('../../resources/kind/scf.png')}
                    className="progress-icon"
                  ></Image>
                  <Text
                    className={
                      'progress-line ' +
                      (sendTemplateMessageLoading && 'pending') +
                      ' ' +
                      (sendTemplateMessageResult && 'success') +
                      ' ' +
                      (sendTemplateMessageError && 'fail')
                    }
                  ></Text>
                  <Image
                    src={require('../../../API/resources/kind/device.png')}
                    className="progress-icon"
                  ></Image>
                </View>
                <View className="data-area">
                  {sendTemplateMessageResult ? (
                    <View className="data-text">
                      <Icon type="success"></Icon>
                      <Text>发送模板消息成功，返回微信主窗口查看</Text>
                    </View>
                  ) : (
                    sendTemplateMessageError && (
                      <View className="data-text">
                        <Icon type="warn" color="#F43530"></Icon>
                        <Text>发送失败</Text>
                      </View>
                    )
                  )}
                </View>
                <View className="btn-area">
                  <Form
                    onSubmit={this.sendTemplateMessageViaCloudFunction}
                    reportSubmit
                  >
                    <Button formType="submit" loading={cloudLoading}>
                      发送模板消息
                    </Button>
                  </Form>
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
                      (getWXACodeLoading && 'pending') +
                      ' ' +
                      (getWXACodeResult && 'success') +
                      ' ' +
                      (getWXACodeError && 'fail')
                    }
                  ></Text>
                  <Image
                    src={require('../../resources/kind/scf.png')}
                    className="progress-icon"
                  ></Image>
                </View>
                {getWXACodeResult && (
                  <View className="progress-figure">
                    <Image
                      src={getWXACodeResult.result}
                      mode="aspectFit"
                    ></Image>
                  </View>
                )}
                <View className="data-area">
                  {getWXACodeResult ? (
                    <View className="data-text">
                      <Icon type="success"></Icon>
                      <Text>获取成功</Text>
                    </View>
                  ) : (
                    getWXACodeError && (
                      <View className="data-text">
                        <Icon type="warn" color="#F43530"></Icon>
                        <Text>获取失败</Text>
                      </View>
                    )
                  )}
                </View>
                <View className="btn-area">
                  <Button
                    onClick={this.getWXACodeViaCloudFunction}
                    loading={cloudLoading}
                  >
                    获取小程序码
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
