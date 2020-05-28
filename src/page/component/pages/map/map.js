import { Block, View, Navigator, Map, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FootTmpl from '../../../../imports/FootTmpl.js'
import HeadTmpl from '../../../../imports/HeadTmpl.js'
import './map.scss'

@withWeapp({
  onShareAppMessage() {
    return {
      title: 'map',
      path: 'page/component/pages/map/map'
    }
  },

  data: {
    latitude: 23.099994,
    longitude: 113.32452,
    markers: [
      {
        latitude: 23.099994,
        longitude: 113.32452,
        name: 'T.I.T 创意园'
      }
    ],
    covers: [
      {
        latitude: 23.099994,
        longitude: 113.34452,
        iconPath: '/image/location.png'
      },
      {
        latitude: 23.099994,
        longitude: 113.30452,
        iconPath: '/image/location.png'
      }
    ],
    polygons: [
      {
        points: [
          {
            latitude: 23.099994,
            longitude: 113.32452
          },
          {
            latitude: 23.098994,
            longitude: 113.32352
          },
          {
            latitude: 23.098994,
            longitude: 113.32552
          }
        ],
        strokeWidth: 3,
        strokeColor: '#FFFFFFAA'
      }
    ],
    subKey: 'B5QBZ-7JTLU-DSSVA-2BRJ3-TNXLF-2TBR7',
    enable3d: false,
    showCompass: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolygon: false,
    enableSatellite: false,
    enableTraffic: false
  },
  toggle3d() {
    this.setData({
      enable3d: !this.data.enable3d
    })
  },
  toggleShowCompass() {
    this.setData({
      showCompass: !this.data.showCompass
    })
  },
  toggleOverlooking() {
    this.setData({
      enableOverlooking: !this.data.enableOverlooking
    })
  },
  toggleZoom() {
    this.setData({
      enableZoom: !this.data.enableZoom
    })
  },
  toggleScroll() {
    this.setData({
      enableScroll: !this.data.enableScroll
    })
  },
  toggleRotate() {
    this.setData({
      enableRotate: !this.data.enableRotate
    })
  },
  togglePolygon() {
    this.setData({
      drawPolygon: !this.data.drawPolygon
    })
  },
  toggleSatellite() {
    this.setData({
      enableSatellite: !this.data.enableSatellite
    })
  },
  toggleTraffic() {
    this.setData({
      enableTraffic: !this.data.enableTraffic
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: 'map'
  }

  render() {
    const {
      subKey,
      latitude,
      longitude,
      markers,
      covers,
      enable3d,
      showCompass,
      enableZoom,
      enableRotate,
      enableSatellite,
      enableTraffic,
      enableOverlooking,
      enableScroll,
      drawPolygon,
      polygons
    } = this.data
    return (
      <View className="container">
        <HeadTmpl data={{ title: 'map' }}></HeadTmpl>
        <View className="page-body">
          <View className="page-section-title">
            当前组件使用了墨渊底图样式，查看
            <Navigator
              className="navigator"
              url="/page/component/pages/map-styles/map-styles"
            >
              更多样式
            </Navigator>
            。
          </View>
          <View className="page-section page-section-gap">
            <Map
              subkey={subKey}
              style="width: 100%; height: 300px;"
              latitude={latitude}
              longitude={longitude}
              scale={18}
              markers={markers}
              covers={covers}
              enable3D={enable3d}
              showCompass={showCompass}
              enableZoom={enableZoom}
              enableRotate={enableRotate}
              enableSatellite={enableSatellite}
              enableTraffic={enableTraffic}
              enableOverlooking={enableOverlooking}
              enableScroll={enableScroll}
              polygons={drawPolygon ? polygons : []}
            ></Map>
          </View>
        </View>
        <View className="page-section">
          <View className="btn-area">
            <Button onClick={this.toggle3d}>
              {(!enable3d ? '启用' : '关闭') + '3D效果'}
            </Button>
            <Button onClick={this.toggleShowCompass}>
              {(!showCompass ? '显示' : '关闭') + '指南针'}
            </Button>
            <Button onClick={this.toggleOverlooking}>
              {(!enableOverlooking ? '开启' : '关闭') + '俯视支持'}
            </Button>
            <Button onClick={this.toggleRotate}>
              {(!enableRotate ? '开启' : '关闭') + '旋转支持'}
            </Button>
            <Button onClick={this.togglePolygon}>
              {(!drawPolygon ? '绘制' : '清除') + '多边形'}
            </Button>
            <Button onClick={this.toggleZoom}>
              {(!enableZoom ? '开启' : '关闭') + '缩放支持'}
            </Button>
            <Button onClick={this.toggleScroll}>
              {(!enableScroll ? '开启' : '关闭') + '拖动支持'}
            </Button>
            <Button onClick={this.toggleSatellite}>
              {(!enableSatellite ? '开启' : '关闭') + '卫星图'}
            </Button>
            <Button onClick={this.toggleTraffic}>
              {(!enableTraffic ? '开启' : '关闭') + '实时路况'}
            </Button>
          </View>
        </View>
        <FootTmpl></FootTmpl>
      </View>
    )
  }
}

export default _C
