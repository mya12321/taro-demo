import { Block, View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './button.scss'
const types = ['default', 'primary', 'warn']
const pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },

  onShareAppMessage() {
    return {
      title: 'button',
      path: 'page/component/pages/button/button'
    }
  },

  setDisabled() {
    this.setData({
      disabled: !this.data.disabled
    })
  },

  setPlain() {
    this.setData({
      plain: !this.data.plain
    })
  },

  setLoading() {
    this.setData({
      loading: !this.data.loading
    })
  }
}

for (let i = 0; i < types.length; ++i) {
  ;(function(type) {
    pageObject[type] = function() {
      const key = type + 'Size'
      const changedData = {}
      changedData[key] = this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  })(types[i])
}

@withWeapp(pageObject)
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'button'
  }

  render() {
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'button' }}></HeadTmpl>
        <View className="page-body">
          <View className="btn-area" id="buttonContainer">
            <Button type="primary">页面主操作 Normal</Button>
            <Button type="primary" loading="true">
              页面主操作 Loading
            </Button>
            <Button type="primary" disabled="true">
              页面主操作 Disabled
            </Button>
            <Button type="default">页面次要操作 Normal</Button>
            <Button type="default" disabled="true">
              页面次要操作 Disabled
            </Button>
            <Button type="warn">警告类操作 Normal</Button>
            <Button type="warn" disabled="true">
              警告类操作 Disabled
            </Button>
            <View className="button-sp-area">
              <Button type="primary" plain="true">
                按钮
              </Button>
              <Button type="primary" disabled="true" plain="true">
                不可点击的按钮
              </Button>
              <Button type="default" plain="true">
                按钮
              </Button>
              <Button type="default" disabled="true" plain="true">
                按钮
              </Button>
              <Button className="mini-btn" type="primary" size="mini">
                按钮
              </Button>
              <Button className="mini-btn" type="default" size="mini">
                按钮
              </Button>
              <Button className="mini-btn" type="warn" size="mini">
                按钮
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
