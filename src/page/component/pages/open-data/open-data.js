import { Block, View, OpenData, Form } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './open-data.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'open-data',
      path: 'page/component/pages/open-data/open-data'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'open-data'
  }

  render() {
    return (
      <Block>
        {/*  <open-data type="userAvatarUrl" lang="zh_CN"></open-data>
                   
                         <open-data type="userGender" lang="zh_CN"></open-data>
                   
                         <open-data type="userNickName" lang="zh_CN"></open-data>
                   
                         <open-data type="userCity" lang="zh_CN"></open-data>
                   
                         <open-data type="userProvince" lang="zh_CN"></open-data>
                   
                         <open-data type="userCountry" lang="zh_CN"></open-data>
                   
                         <open-data type="userLanguage" lang="zh_CN"></open-data>
                   
                    */}
        <View className="container">
          <HeadTmpl data={{ title: 'open-data' }}></HeadTmpl>
          <View className="page-body">
            <View className="avatar">
              <OpenData
                className="avatar-img"
                type="userAvatarUrl"
                lang="zh_CN"
              ></OpenData>
            </View>
            <Form>
              <View className="page-section">
                <View className="weui-cells weui-cells_after-title">
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">昵称</View>
                    </View>
                    <View className="weui-cell__bd">
                      <View className="weui-input">
                        <OpenData type="userNickName" lang="zh_CN"></OpenData>
                      </View>
                    </View>
                  </View>
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">性别</View>
                    </View>
                    <View className="weui-cell__bd">
                      <View className="weui-input">
                        <OpenData type="userGender" lang="zh_CN"></OpenData>
                      </View>
                    </View>
                  </View>
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">地区</View>
                    </View>
                    <View className="weui-cell__bd">
                      <View className="weui-input">
                        <OpenData
                          className="country"
                          type="userCountry"
                          lang="zh_CN"
                        ></OpenData>
                        <OpenData
                          className="province"
                          type="userProvince"
                          lang="zh_CN"
                        ></OpenData>
                        <OpenData
                          className="city"
                          type="userCity"
                          lang="zh_CN"
                        ></OpenData>
                      </View>
                    </View>
                  </View>
                  <View className="weui-cell weui-cell_input">
                    <View className="weui-cell__hd">
                      <View className="weui-label">语言</View>
                    </View>
                    <View className="weui-cell__bd">
                      <View className="weui-input">
                        <OpenData type="userLanguage" lang="zh_CN"></OpenData>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Form>
          </View>
          <FootTmpl></FootTmpl>
        </View>
      </Block>
    )
  }
}

export default _C
