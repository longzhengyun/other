<template>
  <div class="content">
    <swiper class="swiper-content" ref="mySwiper" :options="swiperOption">
      <swiper-slide class="slide1">
        <img class="logo" src="/img/logo.png" />
        <img class="title1" src="/img/bg1_title.png" />
        <div class="slide-arrow"></div>
      </swiper-slide>
      <swiper-slide class="slide2 swiper-no-swiping">
        <div class="title2"><img class="img" src="/img/bg2_title.png" /></div>
        <div class="btn-change" @click="changeSelect">{{btnChangeText}}</div>
        <template v-if="data && activeIndex === 1">
          <select-component class="select" :data="data" v-show="selectShow" @goTarget="goTarget"></select-component>
          <map-component :data="data" @goTarget="goTarget"></map-component>
        </template>
      </swiper-slide>
      <swiper-slide class="slide3">
        <tab-component :data="swiperData" v-if="swiperData" @changeSlide="changeSlide" @backTarget="backTarget"></tab-component>
        <div class="slide-arrow2"><img class="img" src="/img/bg3_arrow.png" alt="" /></div>
      </swiper-slide>
      <swiper-slide class="slide4">
        <div class="slide-info">
          <img class="logo" src="/img/logo.png" />
          <p class="info-text">自如是提供高品质居住产品与生活服务的互联网O2O品牌，旗下拥有自如友家、自如整租、自如精选、自如寓、自如豪宅五类长租产品及自如民宿旅居产品。</p>
          <div class="info-img">
            <img class="img" src="/img/bg4_pic1.jpg" alt="" />
            <img class="img" src="/img/bg4_pic2.jpg" alt="" />
          </div>
          <p class="info-text">入住自如，可以享受wifi覆盖、双周保洁、租客认证、灵活月付、及时维修等服务，同时，您可以通过自如APP预约看房，在线签约。移动生活新方式，随时随地享自如！</p>
          <span class="info-btn" @click="goOutTarget">立即找房</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import MapComponent from './../components/Map'
  import SelectComponent from './../components/Select'
  import TabComponent from './../components/Tab'
  export default {
    name: 'index',
    data () {
      return {
        swiperData: null,
        swiperOption: {
          direction: 'vertical',
          resistanceRatio: 0
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      activeIndex () {
        return this.$refs.mySwiper.swiper.activeIndex
      },
      data () {
        return this.$store.state.data
      },
      selectShow () {
        return this.$store.state.selectShow
      },
      btnChangeText () {
        let btnChangeText
        if (!this.selectShow) {
          btnChangeText = '列表筛选'
        } else {
          btnChangeText = '地图筛选'
        }
        return btnChangeText
      }
    },
    methods: {
      goOutTarget () {
        window.location.href = 'http://sh.m.ziroom.com/'
      },
      goTarget (id) {
        this.data.map((value) => {
          if (value.id === id) {
            this.swiperData = value
          }
        })
        this.swiper.slideTo(2)
      },
      backTarget () {
        this.swiper.slideTo(1)
      },
      changeSlide (index) {
        this.swiper.slideTo(index)
      },
      changeSelect () {
        this.$store.commit('selectShow', !this.selectShow)
      }
    },
    components: {
      MapComponent,
      SelectComponent,
      TabComponent
    }
  }
</script>
<style scoped>
  .content,
  .swiper-content{height:100%;}
  
  .swiper-slide{position:relative;background-position:center bottom;background-repeat:no-repeat;background-size:100% auto;}
  .swiper-slide.slide1{background-color:#19084e;background-image:url(/img/bg1.jpg);}
  /* .swiper-slide.cont-bg{background-image:url(/img/bg2.jpg);} */
  .swiper-slide.slide3{background-color:#250f64;background-image:url(/img/bg3.jpg);}
  .swiper-slide.slide4{background-color:#1a094f;background-image:url(/img/bg4.jpg);}

  .logo,
  .title1,
  .select{position:absolute;left:50%;transform:translateX(-50%);}

  .logo{top:.9rem;width:2.34rem;height:.65rem;}
  .title1{top:3rem;width:5.02rem;height:2.78rem;}

  .title2{position:absolute;top:0;left:0;right:0;z-index:99;padding-top:.5rem;padding-bottom:.1rem;background-image:linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));}
  .title2 .img{display:block;width:6.02rem;height:1.91rem;margin:0 auto;}

  .select{top:3.8rem;bottom:2.7rem;z-index:98;}

  .btn-change{position:absolute;right:.6rem;bottom:.6rem;z-index:99;padding:0 .125rem;color:#edd83b;font-size:.24rem;line-height:.4rem;border:1px solid #edd83b;border-radius:.4rem;background-color:rgba(0, 0, 0, .7);}

  .slide-arrow{position:absolute;left:50%;top:7.2rem;transform:translateX(-50%);width:1.1rem;height:.6rem;background:url(/img/bg3_arrow1.png) no-repeat;background-size:contain;animation:changeArrow linear infinite 1s;}

  .slide-arrow2{position:absolute;left:50%;bottom:.35rem;transform:translateX(-50%);width:.95rem;height:.28rem;}
  .slide-arrow2 .img{display:block;width:100%;height:100%;}

  .slide-info{width:6.7rem;padding-top:2.2rem;margin:0 auto;text-align:justify;}
  .slide-info .logo{position:absolute;left:50%;transform:translateX(-50%);top:.9rem;width:2.34rem;height:.65rem;}
  .slide-info .info-text{margin:0 .5rem;text-indent:2em;font-size:.26rem;line-height:.53rem;color:#0deff3;}
  .slide-info .info-img{margin:.4rem 0;font-size:0;}
  .slide-info .info-img .img{width:3.3rem;height:2.12rem;margin:0 .025rem;}
  .slide-info .info-btn,
  .slide-info .info-btn::after{display:block;width:3.4rem;height:.97rem;line-height:.97rem;border-radius:.97rem;}
  .slide-info .info-btn{position:relative;margin:.8rem auto 0 auto;background-color:#deb937;color:#1e0c54;font-size:.36rem;text-align:center;}
  .slide-info .info-btn::after{content:'';position:absolute;top:.075rem;left:.075rem;border:1px solid #deb937;}
</style>
