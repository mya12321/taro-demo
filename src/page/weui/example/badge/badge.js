import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpBadge from '../../components/badge/badge'
import MpCell from '../../components/cell/cell'
import MpCells from '../../components/cells/cells'
import './badge.scss'

@withWeapp({})
class _C extends Taro.Component {
  config = {}

  render() {
    return (
      <View className="page">
        <View className="page__hd">
          <View className="page__title">Badge</View>
          <View className="page__desc">徽章</View>
        </View>
        <View className="page__bd">
          <MpCells title="新消息提示跟摘要信息后，统一在列表右侧">
            <MpCell
              title="单行列表"
              link
              renderFooter={
                <Block>
                  <View>
                    <View style="display: inline-block;vertical-align:middle; font-size: 17px;">
                      详细信息
                    </View>
                    <MpBadge
                      style="margin-left: 5px;margin-right: 5px;"
                      extClass="blue"
                    ></MpBadge>
                  </View>
                </Block>
              }
            ></MpCell>
          </MpCells>
          <MpCells title="未读数红点跟在主题信息后，统一在列表左侧">
            <MpCell
              renderTitle={
                <Block>
                  <View style="position: relative;margin-right: 10px;">
                    <Image
                      src={require('../images/pic_160.png')}
                      style="width: 50px; height: 50px; display: block"
                    ></Image>
                    <MpBadge
                      content="99+"
                      style="position: absolute;top: -.4em;right: -.4em;"
                    ></MpBadge>
                  </View>
                </Block>
              }
            >
              <View>联系人名称</View>
              <View style="font-size: 13px;color: #888888;">摘要信息</View>
            </MpCell>
            <MpCell link>
              <View style="display: inline-block; vertical-align: middle">
                单行列表
              </View>
              <MpBadge content="8" style="margin-left: 5px;"></MpBadge>
            </MpCell>
            <MpCell link>
              <View style="display: inline-block; vertical-align: middle">
                单行列表
              </View>
              <MpBadge style="margin-left: 5px;" content="New"></MpBadge>
            </MpCell>
          </MpCells>
        </View>
      </View>
    )
  }
}

export default _C
