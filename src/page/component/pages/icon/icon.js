import { Block, View, Icon } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './icon.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'icon',
      path: 'page/component/pages/icon/icon'
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'icon'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'icon' }}></HeadTmpl>
        <View className="icon-box">
          <Icon className="icon-box-img" type="success" size="93"></Icon>
          <View className="icon-box-ctn">
            <View className="icon-box-title">成功</View>
            <View className="icon-box-desc">用于表示操作顺利完成</View>
          </View>
        </View>
        <View className="icon-box">
          <Icon className="icon-box-img" type="info" size="93"></Icon>
          <View className="icon-box-ctn">
            <View className="icon-box-title">提示</View>
            <View className="icon-box-desc">
              用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息
            </View>
          </View>
        </View>
        <View className="icon-box">
          <Icon
            className="icon-box-img"
            type="warn"
            size="93"
            color="#C9C9C9"
          ></Icon>
          <View className="icon-box-ctn">
            <View className="icon-box-title">普通警告</View>
            <View className="icon-box-desc">
              用于表示操作后将引起一定后果的情况；也用于表示由于系统原因而造成的负向结果
            </View>
          </View>
        </View>
        <View className="icon-box">
          <Icon className="icon-box-img" type="warn" size="93"></Icon>
          <View className="icon-box-ctn">
            <View className="icon-box-title">强烈警告</View>
            <View className="icon-box-desc">
              用于表示由于用户原因造成的负向结果；也用于表示操作后将引起不可挽回的严重后果的情况
            </View>
          </View>
        </View>
        <View className="icon-box">
          <Icon className="icon-box-img" type="waiting" size="93"></Icon>
          <View className="icon-box-ctn">
            <View className="icon-box-title">等待</View>
            <View className="icon-box-desc">
              用于表示等待，告知用户结果需等待
            </View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon
              className="icon-small"
              type="success_no_circle"
              size="23"
            ></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">多选控件图标_已选择</View>
            <View className="icon-box-desc">
              用于多选控件中，表示已选择该项目
            </View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon className="icon-small" type="circle" size="23"></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">多选控件图标_未选择</View>
            <View className="icon-box-desc">
              用于多选控件中，表示该项目可被选择，但还未选择
            </View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon className="icon-small" type="warn" size="23"></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">错误提示</View>
            <View className="icon-box-desc">用于在表单中表示出现错误</View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon className="icon-small" type="success" size="23"></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">单选控件图标_已选择</View>
            <View className="icon-box-desc">
              用于单选控件中，表示已选择该项目
            </View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon className="icon-small" type="download" size="23"></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">下载</View>
            <View className="icon-box-desc">用于表示可下载</View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon className="icon-small" type="info_circle" size="23"></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">提示</View>
            <View className="icon-box-desc">用于在表单中表示有信息提示</View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon className="icon-small" type="cancel" size="23"></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">停止或关闭</View>
            <View className="icon-box-desc">用于在表单中，表示关闭或停止</View>
          </View>
        </View>
        <View className="icon-box">
          <View className="icon-small-wrp">
            <Icon className="icon-small" type="search" size="14"></Icon>
          </View>
          <View className="icon-box-ctn">
            <View className="icon-box-title">搜索</View>
            <View className="icon-box-desc">用于搜索控件中，表示可搜索</View>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
