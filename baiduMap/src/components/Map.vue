<template>
  <div class="map" id="map"></div>
</template>

<script>
  export default {
    name: 'MapComponent',
    props: ['data'],
    data () {
      return {
        newData: [],
        currentZoom: 11,
        map: null
      }
    },
    computed: {
      selectPoint () {
        return this.$store.state.selectPoint
      }
    },
    mounted () {
      this.initMap(this.data) // 初始化地图
    },
    methods: {
      initMap (data) {
        // 初始化地图
        this.map = new window.BMap.Map('map',{ minZoom: 11, maxZoom: 14 })
        this.map.centerAndZoom(new window.BMap.Point(this.selectPoint.x, this.selectPoint.y), 11) // 初始化地图，设置中心点坐标和地图级别。
        this.map.disableDoubleClickZoom(true)
        this.map.setCurrentCity('上海')
        this.map.setMapStyle({
          styleJson: [{
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "poilabel",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
              "color": "#000000ff"
            }
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": {
              "color": "#444444ff"
            }
          },
          {
            "featureType": "green",
            "elementType": "all",
            "stylers": {
              "color": "#000000ff",
              "visibility": "off"
            }
          },
          {
            "featureType": "building",
            "elementType": "all",
            "stylers": {
              "color": "#444444ff"
            }
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": {
              "color": "#444444ff",
              "lightness": -43
            }
          },
          {
            "featureType": "subway",
            "elementType": "labels.icon",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "district",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "city",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "town",
            "elementType": "labels",
            "stylers": {
              "color": "#ffffffff",
              "visibility": "off"
            }
          },
          {
            "featureType": "arterial",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          }
        ]
        })

        let myGeo = new window.BMap.Geocoder()
        data.map((m) => {
          let isPass = true
          let obj = {}
          this.newData.map((n) => {
            if (n.area === m.area) {
              isPass = false
            }
          })
          if (isPass) {
            obj = {
              id: m.id,
              area: m.area,
              point: m.point,
              data: []
            }
            this.newData.push(obj)
          }
        })
        
        this.newData.map((n, key) => {
          data.map((m) => {
            if (n.area === m.area) {
              n.data.push(m)
            }
          })
          myGeo.getPoint(n.area, (point) => {
            if (point) {
              n.point = {
                x: point.lng,
                y: point.lat
              }
            }
            if (key === (this.newData.length - 1)) {
              this.createCircle(this.map, this.newData)
            }
          }, '上海市')
        })

        // 地图点击事件
        this.map.addEventListener('click', (e) => {
          if (e.overlay && e.overlay.id) {
            let id = e.overlay.id
            let point = {
              x: e.overlay.point.lng,
              y: e.overlay.point.lat
            }
            this.$store.commit('selectPoint', point)
            if (this.currentZoom === 11) {
              this.currentZoom = 14
              this.map.centerAndZoom(new window.BMap.Point(point.x, point.y), this.currentZoom)
              let targetData
              this.newData.map((value) => {
                if (value.id === id) {
                  targetData = value.data
                }
              })
              // 重画商圈
              this.createCircle(this.map, targetData)
            } else {
              this.goTarget(id) 
            }
          }
        })

        let zoomEnd
        // 改变缩放等级时重画商圈
        this.map.addEventListener('zoomend', () => {
          let zoomEnd = this.map.getZoom()
          if (zoomEnd === 12 || zoomEnd === 13) {
            if (zoomEnd > this.currentZoom) {
              this.currentZoom = 14
            } else if (zoomEnd < this.currentZoom) {
              this.currentZoom = 11
            }
            this.map.centerAndZoom(new window.BMap.Point(this.selectPoint.x, this.selectPoint.y), this.currentZoom)
            // 重画商圈
            if (this.currentZoom === 14) {
              this.beforeCreateCircle(this.map, data)
            } else if (this.currentZoom === 11) {
              this.createCircle(this.map, this.newData)
            }
          }
        })

        // 拖拽地图时重画商圈
        this.map.addEventListener('dragend', () => {
          // 重画商圈
          this.beforeCreateCircle(this.map, data)
        })
      },
      beforeCreateCircle (map, data) {
        let bounds = map.getBounds() //获取可视区域
        let leftBottomPoint = bounds.getSouthWest() //可视区域左下角
        let rightTopPoint = bounds.getNorthEast() //可视区域右上角

        let currentPoint = []

        if(this.currentZoom === 14) {
          data.map((value) => {
            if (value.point.x >= leftBottomPoint.lng 
            && value.point.x <= rightTopPoint.lng 
            && value.point.y >= leftBottomPoint.lat 
            && value.point.y <= rightTopPoint.lat) {
              currentPoint.push(value)
            }
          })
          this.createCircle(map, currentPoint)
        } else if (this.currentZoom === 11) {
          this.createCircle(map, this.newData)
        }
      },
      createCircle (map, data) {
        map.clearOverlays() // 清除覆盖物
        data.map((value) => {
          let point = new window.BMap.Point(value.point.x, value.point.y)

          let icon = new window.BMap.Icon('/img/icon_circle.png', new window.BMap.Size(45, 45))
          let marker = new window.BMap.Marker(point, { icon })
          marker.id = value.id
          map.addOverlay(marker)

          let opts = {
            position: point,
            offset: new window.BMap.Size(-45, 45)
          }
          let labelName
          if (this.currentZoom === 11) {
            labelName = value.area
          } else {
            labelName = value.tradeArea
          }
          let label = new window.BMap.Label(labelName, opts)
          label.setStyle({
            color : '#fff',
            fontSize : '12px',
            width: '135px',
            padding: '0',
            lineHeight : '20px',
            textAlign: 'center',
            backgroundColor: 'transparent',
            borderWidth: '0'
          })
          marker.setLabel(label)
        })
      },
      goTarget (id) {
        this.$emit('goTarget', id)
      }
    },
    beforeDestroy () {
      this.map = null
    }
  }
</script>

<style scoped>
  .map{height:100%;background-color:transparent !important;}
  .map >>> .anchorBL{display:none;}
</style>
