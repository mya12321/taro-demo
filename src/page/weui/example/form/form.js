import {
  Block,
  Input,
  Button,
  Picker,
  View,
  Image,
  Switch,
  Textarea,
  CheckboxGroup,
  Label,
  Checkbox,
  Icon,
  Navigator
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import MpForm from '../../components/form/form'
import MpCheckboxGroup from '../../components/checkbox-group/checkbox-group'
import MpCheckbox from '../../components/checkbox/checkbox'
import MpCell from '../../components/cell/cell'
import MpCells from '../../components/cells/cells'
import MpToptips from '../../components/toptips/toptips'
import MpFormPage from '../../components/form-page/form-page'
import './form.scss'

@withWeapp({
  data: {
    showTopTips: false,

    radioItems: [
      { name: 'cell standard', value: '0', checked: true },
      { name: 'cell standard', value: '1' }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' }
    ],

    date: '2016-09-01',
    time: '12:01',

    countryCodes: ['+86', '+80', '+84', '+87'],
    countryCodeIndex: 0,

    countries: ['中国', '美国', '英国'],
    countryIndex: 0,

    accounts: ['微信号', 'QQ', 'Email'],
    accountIndex: 0,

    isAgree: false,
    formData: {},
    rules: [
      {
        name: 'radio',
        rules: { required: false, message: '单选列表是必选项' }
      },
      {
        name: 'checkbox',
        rules: { required: true, message: '多选列表是必选项' }
      },
      {
        name: 'name',
        rules: { required: true, message: '请输入姓名' }
      },
      {
        name: 'qq',
        rules: { required: true, message: 'qq必填' }
      },
      {
        name: 'mobile',
        rules: [
          { required: true, message: 'mobile必填' },
          { mobile: true, message: 'mobile格式不对' }
        ]
      },
      {
        name: 'vcode',
        rules: { required: true, message: '验证码必填' }
      },
      {
        name: 'idcard',
        rules: {
          validator: function(rule, value, param, modeels) {
            if (!value || value.length !== 18) {
              return 'idcard格式不正确'
            }
          }
        }
      }
    ]
  },
  methods: {
    radioChange: function(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)

      var radioItems = this.data.radioItems
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value
      }

      this.setData({
        radioItems: radioItems,
        [`formData.radio`]: e.detail.value
      })
    },
    checkboxChange: function(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)

      var checkboxItems = this.data.checkboxItems,
        values = e.detail.value
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value == values[j]) {
            checkboxItems[i].checked = true
            break
          }
        }
      }

      this.setData({
        checkboxItems: checkboxItems,
        [`formData.checkbox`]: e.detail.value
      })
    },
    bindDateChange: function(e) {
      this.setData({
        date: e.detail.value,
        [`formData.date`]: e.detail.value
      })
    },
    formInputChange(e) {
      const { field } = e.currentTarget.dataset
      this.setData({
        [`formData.${field}`]: e.detail.value
      })
    },
    bindTimeChange: function(e) {
      this.setData({
        time: e.detail.value
      })
    },
    bindCountryCodeChange: function(e) {
      console.log('picker country code 发生选择改变，携带值为', e.detail.value)

      this.setData({
        countryCodeIndex: e.detail.value
      })
    },
    bindCountryChange: function(e) {
      console.log('picker country 发生选择改变，携带值为', e.detail.value)

      this.setData({
        countryIndex: e.detail.value
      })
    },
    bindAccountChange: function(e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value)

      this.setData({
        accountIndex: e.detail.value
      })
    },
    bindAgreeChange: function(e) {
      this.setData({
        isAgree: !!e.detail.value.length
      })
    },
    submitForm() {
      this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        } else {
          Taro.showToast({
            title: '校验通过'
          })
        }
      })
      // this.selectComponent('#form').validateField('mobile', (valid, errors) => {
      //     console.log('valid', valid, errors)
      // })
    }
  }
})
class _C extends Taro.Component {
  config = {
    component: true
  }

  render() {
    const {
      error,
      rules,
      formData,
      radioItems,
      checkboxItems,
      date,
      countryCodeIndex,
      countryCodes,
      accountIndex,
      accounts,
      countryIndex,
      countries,
      isAgree
    } = this.data
    return (
      <Block>
        <MpToptips msg={error} type="error" show={error}></MpToptips>
        <MpFormPage
          title="表单结构"
          subtitle="展示表单页面的信息结构样式, 分别由头部区域/控件区域/提示区域/操作区域和底部信息区域组成。"
          renderTips={
            <Block>
              <CheckboxGroup onChange={this.bindAgreeChange}>
                <Label className="weui-agree" for="weuiAgree">
                  <View className="weui-agree__text">
                    <Checkbox
                      className="weui-agree__checkbox"
                      id="weuiAgree"
                      value="agree"
                      checked={isAgree}
                    ></Checkbox>
                    <View className="weui-agree__checkbox-icon">
                      {isAgree && (
                        <Icon
                          className="weui-agree__checkbox-icon-check"
                          type="success_no_circle"
                          size="9"
                        ></Icon>
                      )}
                    </View>
                    阅读并同意
                    <Navigator url className="weui-agree__link">
                      《相关条款》
                    </Navigator>
                  </View>
                </Label>
              </CheckboxGroup>
            </Block>
          }
          renderButton={
            <Block>
              <View>
                <Button
                  className="weui-btn"
                  type="primary"
                  onClick={this.submitForm}
                >
                  确定
                </Button>
              </View>
            </Block>
          }
        >
          <MpForm id="form" rules={rules} models={formData}>
            <MpCells title="单选列表项">
              <MpCheckboxGroup
                prop="radio"
                multi={false}
                onChange={this.radioChange}
              >
                {radioItems.map((item, index) => {
                  return (
                    <MpCheckbox
                      key="value"
                      label={item.name}
                      value={item.value}
                      checked={item.checked}
                    ></MpCheckbox>
                  )
                })}
              </MpCheckboxGroup>
            </MpCells>
            <MpCells title="复选列表项">
              <MpCheckboxGroup
                prop="checkbox"
                multi={true}
                onChange={this.checkboxChange}
              >
                {checkboxItems.map((item, index) => {
                  return (
                    <MpCheckbox
                      key="value"
                      label={item.name}
                      value={item.value}
                      checked={item.checked}
                    ></MpCheckbox>
                  )
                })}
              </MpCheckboxGroup>
            </MpCells>
            <MpCells title="表单" footer="底部说明文字底部说明文字">
              <MpCell prop="name" title="姓名" extClass>
                <Input
                  onInput={this.formInputChange}
                  data-field="name"
                  className="weui-input"
                  placeholder="请输入姓名"
                ></Input>
              </MpCell>
              <MpCell prop="qq" title="qq" extClass>
                <Input
                  onInput={this.formInputChange}
                  data-field="qq"
                  className="weui-input"
                  placeholder="请输入qq"
                ></Input>
              </MpCell>
              <MpCell
                prop="mobile"
                title="手机号"
                extClass="weui-cell_vcode"
                renderFooter={
                  <Block>
                    <Button type="default" className="weui-vcode-btn">
                      获取验证码
                    </Button>
                  </Block>
                }
              >
                <Input
                  onInput={this.formInputChange}
                  data-field="mobile"
                  className="weui-input"
                  placeholder="请输入手机号"
                ></Input>
              </MpCell>
              <MpCell prop="date" title="日期" extClass>
                <Picker
                  data-field="date"
                  mode="date"
                  value={date}
                  start="2015-09-01"
                  end="2017-09-01"
                  onChange={this.bindDateChange}
                >
                  <View className="weui-input">{date}</View>
                </Picker>
              </MpCell>
              <MpCell
                prop="vcode"
                title="验证码"
                extClass="weui-cell_vcode"
                renderFooter={
                  <Block>
                    <Image
                      className="weui-vcode-img"
                      src={require('../images/vcode.jpg')}
                      style="width: 108px"
                    ></Image>
                  </Block>
                }
              >
                <Input
                  onInput={this.formInputChange}
                  data-field="vcode"
                  className="weui-input"
                  placeholder="请输入验证码"
                ></Input>
              </MpCell>
            </MpCells>
            <MpCells title="提交后表单项报错">
              <MpCell showError prop="idcard" title="卡号" extClass>
                <Input
                  onInput={this.formInputChange}
                  data-field="idcard"
                  className="weui-input"
                  placeholder="请输入卡号"
                ></Input>
              </MpCell>
            </MpCells>
            <MpCells title="开关">
              <MpCell
                title="标题文字"
                extClass
                renderFooter={
                  <Block>
                    <Switch checked></Switch>
                  </Block>
                }
              ></MpCell>
            </MpCells>
            <MpCells title="文本框">
              <MpCell title="标题文字" extClass>
                <Input className="weui-input" placeholder="请输入文本"></Input>
              </MpCell>
            </MpCells>
            <MpCells title="文本域">
              <MpCell hasHeader={false} hasFooter={false} title extClass>
                <Textarea
                  className="weui-textarea"
                  placeholder="请输入文本"
                  style="height: 3.3em"
                ></Textarea>
                <View className="weui-textarea-counter">0/200</View>
              </MpCell>
            </MpCells>
            <MpCells title="选择">
              <MpCell
                extClass="weui-cell_select weui-cell_select-before"
                renderTitle={
                  <Block>
                    <View style="width: 105px">
                      <Picker
                        onChange={this.bindCountryCodeChange}
                        value={countryCodeIndex}
                        range={countryCodes}
                      >
                        <View className="weui-select">
                          {countryCodes[countryCodeIndex]}
                        </View>
                      </Picker>
                    </View>
                  </Block>
                }
              >
                <Input className="weui-input" placeholder="请输入号码"></Input>
              </MpCell>
            </MpCells>
            <MpCells title="选择">
              <MpCell hasHeader={false} extClass="weui-cell_select">
                <Picker
                  onChange={this.bindAccountChange}
                  value={accountIndex}
                  range={accounts}
                >
                  <View className="weui-select">{accounts[accountIndex]}</View>
                </Picker>
              </MpCell>
              <MpCell
                extClass="weui-cell_select weui-cell_select-after"
                renderTitle={
                  <Block>
                    <View className="weui-label">国家/地区</View>
                  </Block>
                }
              >
                <Picker
                  onChange={this.bindCountryChange}
                  value={countryIndex}
                  range={countries}
                >
                  <View className="weui-select">{countries[countryIndex]}</View>
                </Picker>
              </MpCell>
            </MpCells>
          </MpForm>
        </MpFormPage>
      </Block>
    )
  }
}

export default _C
