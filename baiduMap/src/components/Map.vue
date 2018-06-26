<template>
  <div class="map" id="map"></div>
</template>

<script>
  export default {
    name: 'Map',
    props: ['data'],
    computed: {
      selectPoint () {
        return this.$store.state.selectPoint
      }
    },
    watch: {
      data: function (val) {
        if (val.length) {
          this.initMap(val) // 初始化地图
        }
      }
    },
    mounted () {
      if (this.data.length) {
        this.initMap(this.data) // 初始化地图
      }
    },
    methods: {
      initMap (data) {
        // 初始化地图
        let map = new window.BMap.Map('map', { minZoom: 14, maxZoom: 15 })
        map.centerAndZoom(new window.BMap.Point(this.selectPoint.x, this.selectPoint.y), 15) // 初始化地图，设置中心点坐标和地图级别。
        map.disableDoubleClickZoom(true)
        map.setCurrentCity('上海')
        map.setMapStyle({
          styleJson: [
            {
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
            }
          ]
        })

        // 画商圈
        this.createCircle(map, data)

        // 改变缩放等级时重画商圈
        map.addEventListener('zoomend', () => {  
          let centerPoint = map.getCenter()
          let point = {
            x: centerPoint.lng.toString(),
            y: centerPoint.lat.toString()
          }
          this.$store.commit('selectPoint', point)
          
          // 重画商圈
          this.createCircle(map, data)
        })

        // 拖拽地图时重画商圈
        map.addEventListener('dragend', () => {  
          let centerPoint = map.getCenter()
          let point = {
            x: centerPoint.lng.toString(),
            y: centerPoint.lat.toString()
          }
          this.$store.commit('selectPoint', point)
          
          // 重画商圈
          this.createCircle(map, data)
        })
      },
      createCircle (map, data) {
        map.clearOverlays() // 清除覆盖物

        let bounds = map.getBounds() //获取可视区域
        let leftBottomPoint = bounds.getSouthWest() //可视区域左下角
        let rightTopPoint = bounds.getNorthEast() //可视区域右上角

        // 自定义覆盖物
        function ComplexCustomOverlay (point, text, id, key) {
          this._point = point
          this._text = text
          this._id = id
          this._key = key
        }
        ComplexCustomOverlay.prototype = new window.BMap.Overlay()
        ComplexCustomOverlay.prototype.initialize = function (map) {
          this._map = map

          let scaleValue
          if (this._key === 0) {
            scaleValue = 1.2
          } else if (this._key === 1) {
            scaleValue = 1
          } else if (this._key === 2 || this._key === 3) {
            scaleValue = 0.9
          } else if (this._key === 4 || this._key === 5) {
            scaleValue = 0.8
          } else if (this._key === 6 || this._key === 7 || this._key === 8) {
            scaleValue = 0.7
          } else if (this._key === 9 || this._key === 10 || this._key === 11) {
            scaleValue = 0.6
          } else if (this._key === 12 || this._key === 13 || this._key === 14) {
            scaleValue = 0.5
          } else if (this._key === 15 || this._key === 16 || this._key === 17) {
            scaleValue = 0.4
          } else {
            scaleValue = 0.3
          }

          let div = this._div = document.createElement('div')
          div.id = this._id
          div.setAttribute('data-pointx', this._point.lng)
          div.setAttribute('data-pointy', this._point.lat) 
          div.style.position = 'absolute'
          div.style.zIndex = window.BMap.Overlay.getZIndex(this._point.lat)
          div.style.backgroundColor = 'rgba(236, 151, 3, .5)'
          div.style.width = '64px'
          div.style.height = '64px'
          div.style.borderRadius = '100%'
          div.style.MozUserSelect = 'none'
          div.style.transform = 'scale(' + scaleValue + ')'

          let div2 = document.createElement('div')
          div2.id = this._id
          div2.setAttribute('data-pointx', this._point.lng)
          div2.setAttribute('data-pointy', this._point.lat) 
          div2.style.position = 'absolute'
          div2.style.top = '50%'
          div2.style.left = '50%'
          div2.style.margin = '-24px 0 0 -24px'
          div2.style.backgroundColor = 'rgba(255, 246, 4, .5)'
          div2.style.width = '48px'
          div2.style.height = '48px'
          div2.style.borderRadius = '100%'

          let div3 = document.createElement('div')
          div3.setAttribute('data-pointx', this._point.lng)
          div3.setAttribute('data-pointy', this._point.lat) 
          div3.id = this._id
          div3.style.position = 'absolute'
          div3.style.top = '50%'
          div3.style.left = '50%'
          div3.style.margin = '-16px 0 0 -16px'
          div3.style.backgroundColor = 'rgba(255, 255, 255, 1)'
          div3.style.width = '32px'
          div3.style.height = '32px'
          div3.style.borderRadius = '100%'

          let span = document.createElement('span')
          span.id = this._id
          span.setAttribute('data-pointx', this._point.lng)
          span.setAttribute('data-pointy', this._point.lat) 
          span.style.position = 'absolute'
          span.style.top = '70px'
          span.style.left = '50%'
          span.style.width = '140px'
          span.style.marginLeft = '-70px'
          span.style.paddingLeft = '6px'
          span.style.fontWeight = 'bold'
          span.style.fontFamily = 'simsun'
          span.style.textAlign = 'center'
          span.style.color = '#fff'
          span.style.fontSize = '12px'
          span.style.whiteSpace = 'nowrap'
          span.innerHTML = this._text + ' &gt;'

          div.appendChild(div2)
          div.appendChild(div3)
          div.appendChild(span)

          map.getPanes().labelPane.appendChild(div)

          return div
        }
        ComplexCustomOverlay.prototype.draw = function () {
          let map = this._map
          let pixel = map.pointToOverlayPixel(this._point)
          this._div.style.left = pixel.x - 32 + 'px'
          this._div.style.top = pixel.y - 32 + 'px'
        }

        let currentPoint = []

        data.map((value) => {
          if (value.point.x >= leftBottomPoint.lng 
          && value.point.x <= rightTopPoint.lng 
          && value.point.y >= leftBottomPoint.lat 
          && value.point.y <= rightTopPoint.lat) {
            currentPoint.push(value)
          }
        })

        const sortData = (data) => { // 数据排序
          return data.sort((a, b) => {
            let centerPointValue = Math.sqrt(this.selectPoint.x * this.selectPoint.x + this.selectPoint.y * this.selectPoint.y)
            let aValue = Math.sqrt(a.point.x * a.point.x + a.point.y * a.point.y)
            let bValue = Math.sqrt(b.point.x * b.point.x + b.point.y * b.point.y)
            return Math.abs(aValue - centerPointValue) - Math.abs(bValue - centerPointValue)
          })
        }

        currentPoint = sortData(currentPoint)

        currentPoint.map((value, key) => {
          let point = new window.BMap.Point(value.point.x, value.point.y)
          let myCompOverlay = new ComplexCustomOverlay(point, value.tradeArea, value.id, key)
          map.addOverlay(myCompOverlay)

          window.BMapLib.EventWrapper.clearListeners(myCompOverlay._div, 'touchend')
          window.BMapLib.EventWrapper.addDomListener(myCompOverlay._div, 'touchend', (e) => {
            e.stopPropagation()
            if (e.target && e.target.id) {
              let id = e.target.id
              let point = {
                x: e.target.dataset.pointx,
                y: e.target.dataset.pointy
              }
              this.goTarget(id, point)
            }
          })
        })
      },
      goTarget (id, point) {
        let centerPoint = {
          x: point.x,
          y: point.y
        }
        this.$emit('goTarget', id, centerPoint)
      }
    }
  }
</script>

<style scoped>
  .map{height:100%;background-color:transparent !important;}
  .map >>> img{filter:grayscale(1) invert(1) brightness(.5);}
  .map >>> .anchorBL{display:none;}
</style>
