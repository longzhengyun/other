<template>
  <div class="tab-wrap" ref="tabWrap">
    <ul class="tab-option">
      <li class="option-list" :class="{ 'cur': key === tabIndex }" v-for="(item, key) in tabOption" :key="key" @click="changeTab(key)">
        <span class="name">{{item.name}}</span>
        <span class="text">{{item.text}}</span>
      </li>
    </ul>
    <ul class="tab-cont">
      <li class="cont-list" v-show="tabIndex === 0">
        <div class="title title1"><img class="img" src="/img/bg3_title1.png" alt="" /></div>
        <div class="pic" :style="{ backgroundImage: 'url(' + data.eatImg + ')' }">
          <span class="name" @click="backTarget"><i class="name-location"><img class="img" src="/img/bg3_location.png" alt="" /></i>{{data.tradeArea}}</span>
          <span class="other"></span>
        </div>
        <div class="shop-top5 swiper-no-swiping">
          <div class="shop-title">- TOP5 商家 -</div>
          <ul class="shop-info" ref="tabShop1">
            <li class="info-item" v-for="(item, key) in data.eatBusiness" :key="key">
              <div class="name"><span class="num">0{{key + 1}}</span>{{item.name}}</div>
              <div class="star"><div class="star-a"><div class="star-b" :style="{ width: Number(item.star) / 5 * 100 + '%' }"></div></div>{{item.star}}分</div>
              <div class="evaluate">{{item.evaluate}}</div>
            </li>
          </ul>
          <div class="other1"></div>
          <div class="other2"></div>
          <div class="shop-mask"></div>
        </div>
      </li>
      <li class="cont-list" v-show="tabIndex === 1">
        <div class="title title2"><img class="img" src="/img/bg3_title2.png" alt="" /></div>
        <div class="pic" :style="{ backgroundImage: 'url(' + data.partyImg + ')' }">
          <span class="name" @click="backTarget"><i class="name-location"><img class="img" src="/img/bg3_location.png" alt="" /></i>{{data.tradeArea}}</span>
          <span class="other"></span>
        </div>
        <div class="shop-top5 swiper-no-swiping">
          <div class="shop-title">- TOP5 商家 -</div>
          <ul class="shop-info" ref="tabShop2">
            <li class="info-item" v-for="(item, key) in data.partyBusiness" :key="key">
              <div class="name"><span class="num">0{{key + 1}}</span>{{item.name}}</div>
              <div class="star"><div class="star-a"><div class="star-b" :style="{ width: Number(item.star) / 5 * 100 + '%' }"></div></div>{{item.star}}分</div>
              <div class="evaluate">{{item.evaluate}}</div>
            </li>
          </ul>
          <div class="other1"></div>
          <div class="other2"></div>
          <div class="shop-mask"></div>
        </div>
      </li>
      <li class="cont-list" v-show="tabIndex === 2">
        <div class="title title3"><img class="img" src="/img/bg3_title3.png" alt="" /></div>
        <div class="pic" :style="{ backgroundImage: 'url(' + data.travelImg + ')' }">
          <span class="name" @click="backTarget"><i class="name-location"><img class="img" src="/img/bg3_location.png" alt="" /></i>{{data.tradeArea}}</span>
          <span class="other"></span>
        </div>
        <div class="shop-top5 swiper-no-swiping">
          <div class="shop-title">- TOP5 商家 -</div>
          <ul class="shop-info" ref="tabShop3">
            <li class="info-item" v-for="(item, key) in data.travelBusiness" :key="key">
              <div class="name"><span class="num">0{{key + 1}}</span>{{item.name}}</div>
              <div class="star"><div class="star-a"><div class="star-b" :style="{ width: Number(item.star) / 5 * 100 + '%' }"></div></div>{{item.star}}分</div>
              <div class="evaluate">{{item.evaluate}}</div>
            </li>
          </ul>
          <div class="other1"></div>
          <div class="other2"></div>
          <div class="shop-mask"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TabComponent',
    props: ['data'],
    data () {
      return {
        tabIndex: 0,
        tabOption: [
          { name: '吃', text: 'FOOD' },
          { name: '趴', text: 'PARTY' },
          { name: '浪', text: 'TRAVEL' }
        ]
      }
    },
    computed: {
      tabWrap () {
        return this.$refs.tabWrap
      },
      tabShop1 () {
        return this.$refs.tabShop1
      },
      tabShop2 () {
        return this.$refs.tabShop2
      },
      tabShop3 () {
        return this.$refs.tabShop3
      }
    },
    updated () {
      this.$nextTick(() => {
        this.tabShop1.scrollTop = 0
        this.tabShop2.scrollTop = 0
        this.tabShop3.scrollTop = 0
      })
    },
    mounted () {
      this.initTouchPage()
      this.tabShop1.addEventListener('touchend', (e) => {
        this.handleScroll(e)
      }, true)
      this.tabShop2.addEventListener('touchend', (e) => {
        this.handleScroll(e)
      }, true)
      this.tabShop3.addEventListener('touchend', (e) => {
        this.handleScroll(e)
      }, true)
    },
    methods: {
      initTouchPage () {
        let startPointX
        let startPointY
        let endPointX
        let endPointY
        this.tabWrap.addEventListener('touchstart', (e) => {
          startPointX = e.changedTouches[0].pageX
        }, true)
        this.tabWrap.addEventListener('touchend', (e) => {
          endPointX = e.changedTouches[0].pageX
          if (endPointX - startPointX > 50) {
            if (this.tabIndex > 0) {
              this.tabIndex--
            }
          }
          if (endPointX - startPointX < -50) {
            if (this.tabIndex < 2) {
              this.tabIndex++
            }
          }
        }, true)
      },
      handleScroll (e) {
        e.path.map((value) => {
          if (value.className === 'shop-info') {
            let scrollHeight = value.scrollHeight - 1
            let scrollTop = value.scrollTop
            let clientHeight = value.clientHeight

            if (scrollTop + clientHeight >= scrollHeight) {
              this.changeSlide(3)
            }
          }
        })
      },
      changeTab (key) {
        this.tabIndex = key
      },
      backTarget () {
        this.$emit('backTarget')
      },
      changeSlide (index) {
        this.$emit('changeSlide', index)
      }
    }
  }
</script>

<style scoped>
  .tab-wrap{height:100%;}
  .tab-option{position:absolute;top:.3rem;left:50%;z-index:9;transform:translateX(-50%);font-size:0;white-space:nowrap;background-color:#390d5a;border:1px solid #da3034;border-radius:.75rem;overflow:hidden;}
  .tab-option .option-list{position:relative;display:inline-block;width:1.18rem;padding:.15rem 0;text-align:center;line-height:1;}
  .tab-option .option-list:first-child,
  .tab-option .option-list:last-child{width:1.35rem;}
  .tab-option .option-list::after{content:'';position:absolute;top:50%;right:-1px;transform:translateY(-50%);width:1px;height:50%;background-color:#c98610;}
  .tab-option .option-list:last-child::after,
  .tab-option .option-list.cur::after{content:initial;}
  .tab-option .option-list.cur{background-color:#d93538;}
  .tab-option .option-list .name{display:block;margin-bottom:.1rem;font-size:.32rem;color:#fff;font-weight:bold;}
  .tab-option .option-list .text{display:block;font-size:.15rem;color:#b9b7c1;}

  .tab-cont{padding-top:1.3rem;height:100%;box-sizing:border-box;}
  .tab-cont .cont-list{position:relative;height:100%;}
  .tab-cont .cont-list .img{display:block;width:100%;height:100%;}
  .tab-cont .cont-list .title{height:1.44rem;margin:0 auto;}
  .tab-cont .cont-list .title1{width:3.5rem;}
  .tab-cont .cont-list .title2{width:4.36rem;}
  .tab-cont .cont-list .title3{width:3.55rem;}
  .tab-cont .cont-list .pic{position:relative;width:6.25rem;height:3.71rem;z-index:5;margin:.1rem auto 0 auto;background-repeat:no-repeat;background-size:contain;background-position:center center;}
  .tab-cont .cont-list .pic .name{position:absolute;bottom:.24rem;left:50%;transform:translateX(-50%);padding:0 .6rem 0 .35rem;line-height:.6rem;border-radius:.6rem;background-color:rgba(255, 216, 0, .7);font-size:.28rem;color:#1f0c55;}
  .tab-cont .cont-list .pic .name::after{content:'';position:absolute;top:50%;right:.35rem;margin-top:-.06rem;border:.06rem solid;border-color:#1f0c55 #1f0c55 transparent transparent;transform:rotate(45deg);}
  .tab-cont .cont-list .pic .name-location{display:inline-block;width:.24rem;height:.31rem;vertical-align:middle;margin-right:.1rem;}
  .tab-cont .cont-list .pic .other{position:absolute;top:0;right:0;width:1.1rem;height:1.28rem;border:1px solid;border-color:#d83536 #d83536 transparent transparent;}

  .shop-top5{position:absolute;top:5.265rem;bottom:.88rem;left:50%;transform:translateX(-50%);width:6.25rem;color:#fff;background-color:#1e0b52;}
  .shop-top5 .shop-title{padding-top:.1rem;text-align:center;font-size:.26rem;line-height:.5rem;}
  .shop-top5 .shop-info{position:absolute;top:.6rem;left:.25rem;right:.25rem;bottom:0;overflow-x:hidden;}
  .shop-top5 .shop-info .info-item{padding-bottom:.2rem;margin-bottom:.2rem;border-bottom:1px solid rgba(6, 205, 218, .6);}
  .shop-top5 .shop-info .info-item:last-child{border-bottom:0;margin-bottom:0;}
  .shop-top5 .shop-info .info-item .name{font-size:.32rem;color:#00fdfc;font-weight:bold;}
  .shop-top5 .shop-info .info-item .num{margin-right:.1rem;font-size:.2rem;color:#d83536;}
  .shop-top5 .shop-info .info-item .star{position:relative;padding-left:1.61rem;font-size:.26rem;color:#8a7cb1;font-weight:bold;}
  .shop-top5 .shop-info .info-item .star-a,
  .shop-top5 .shop-info .info-item .star-b{position:absolute;left:0;top:50%;transform:translateY(-50%);height:.26rem;background-repeat:no-repeat;}
  .shop-top5 .shop-info .info-item .star-a{width:1.51rem;background-image:url(/img/bg3_star1.png);background-size:1.51rem .26rem;}
  .shop-top5 .shop-info .info-item .star-b{width:0;background-image:url(/img/bg3_star2.png);background-size:auto .26rem;}
  .shop-top5 .shop-info .info-item .evaluate{position:relative;margin-top:.05rem;font-size:.24rem;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;}
  .shop-top5 .shop-info .info-item .evaluate::before,
  .shop-top5 .shop-info .info-item .evaluate::after{font-size:.24rem;color:#fff;font-family:SimSun;}
  .shop-top5 .shop-info .info-item .evaluate::before{content:'“';}
  .shop-top5 .shop-info .info-item .evaluate::after{content:'”';}
  
  .shop-top5 .other1{position:absolute;top:50%;right:-.25rem;transform:translateY(-50%);width:.03rem;height:1.9rem;background-color:#d83536;}
  .shop-top5 .other2{position:absolute;bottom:0;left:0;z-index:5;width:.8rem;height:.8rem;border:1px solid;border-color:transparent transparent #d83536 #d83536;}
  .shop-top5 .shop-mask{position:absolute;bottom:-1px;left:0;right:0;height:1rem;background-image:linear-gradient(to top, rgba(30, 11, 82, 1), rgba(30, 11, 82, 0));}
</style>
