<template>
  <div id="app">
    <div class="data-mask" v-if="dataMask">
      <div class="toast">
        <span class="icon"><img class="img" src="/img/loading.png" /></span>
        <span class="text">数据加载中</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'app',
    data () {
      return {
        dataMask: true
      }
    },
    created () {
      this.getData() // 获取数据
    },
    methods: {
      getData () {
        axios.get('/data.json').then((res) => {
          this.initData(res.data) // 初始化数据
        }).catch((error) => {
          console.log(error)
        })
      },
      initData (data) {
        let newData = []
        data.map((value) => {
          let obj = {}
          obj.id = value.id
          obj.area = value.area
          obj.tradeArea = value.tradeArea
          obj.point = {
            x: value['point:x'],
            y: value['point:y']
          }
          
          obj.eatBusiness = []
          obj.eatImg = value['eat:img']
          if (value['eat1:business:name']) {
            obj.eatBusiness.push(this.getObj('eat1', value))
          }
          if (value['eat2:business:name']) {
            obj.eatBusiness.push(this.getObj('eat2', value))
          }
          if (value['eat3:business:name']) {
            obj.eatBusiness.push(this.getObj('eat3', value))
          }
          if (value['eat4:business:name']) {
            obj.eatBusiness.push(this.getObj('eat4', value))
          }
          if (value['eat5:business:name']) {
            obj.eatBusiness.push(this.getObj('eat5', value))
          }

          obj.partyBusiness = []
          obj.partyImg = value['party:img']
          if (value['party1:business:name']) {
            obj.partyBusiness.push(this.getObj('party1', value))
          }
          if (value['party2:business:name']) {
            obj.partyBusiness.push(this.getObj('party2', value))
          }
          if (value['party3:business:name']) {
            obj.partyBusiness.push(this.getObj('party3', value))
          }
          if (value['party4:business:name']) {
            obj.partyBusiness.push(this.getObj('party4', value))
          }
          if (value['party5:business:name']) {
            obj.partyBusiness.push(this.getObj('party5', value))
          }

          obj.travelBusiness = []
          obj.travelImg = value['travel:img']
          if (value['travel1:business:name']) {
            obj.travelBusiness.push(this.getObj('travel1', value))
          }
          if (value['travel2:business:name']) {
            obj.travelBusiness.push(this.getObj('travel2', value))
          }
          if (value['travel3:business:name']) {
            obj.travelBusiness.push(this.getObj('travel3', value))
          }
          if (value['travel4:business:name']) {
            obj.travelBusiness.push(this.getObj('travel4', value))
          }
          if (value['travel5:business:name']) {
            obj.travelBusiness.push(this.getObj('travel5', value))
          }

          newData.push(obj)
        })
        this.$store.commit('data', newData)
        this.dataMask = false
      },
      getObj (name, value) {
        return {
          name: value[name + ':business:name'],
          star: value[name + ':business:star'],
          evaluate: value[name + ':business:evaluate'],
          logo: value[name + ':business:logo'],
        }
      }
    }
  }
</script>

<style>
  #app{height:100%;}
  
  .data-mask{position:absolute;top:0;right:0;bottom:0;left:0;z-index:999;background-color:rgba(0, 0, 0, .8);}
  .data-mask .toast{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);}
  .data-mask .toast .img{display:block;margin:0 auto .2rem auto;width:.72rem;height:.72rem;animation:rotateImg linear infinite 1.5s;}
  .data-mask .toast .text{font-size:.28rem;color:#666;}

  @keyframes changeArrow{
    0%{background-image:url(/img/bg3_arrow1.png)}
    50%{background-image:url(/img/bg3_arrow2.png)}
    100%{background-image:url(/img/bg3_arrow3.png)}
  }

  @keyframes rotateImg{
    0%{transform:rotate(0)}
    100%{transform:rotate(360deg)}
  }

  @keyframes moveText{
    0%{left:0}
    25%{left:.05rem}
    50%{left:0}
    75%{left:-.05rem}
    100%{left:0}
  }
</style>
