<template>
  <div class="content">
    <swiper class="swiper-content" :options="swiperOption">
      <swiper-slide class="slide1">
        <tab-component :data="swiperData" v-if="swiperData"></tab-component>
        <div class="slide-arrow"><img class="img" src="/img/bg3_arrow.png" alt="" /></div>
      </swiper-slide>
      <swiper-slide class="slide2">
        <div class="slide-info">
          <p class="info-text">自如是提供高品质居住产品与生活服务的互联网O2O品牌，旗下拥有自如友家、自如整租、自如精选、自如寓、自如豪宅五类长租产品及自如民宿旅居产品。</p>
          <p class="info-text">入住自如，可以享受wifi覆盖、双周保洁、租客认证、灵活月付、及时维修等服务，同时，您可以通过自如APP预约看房，在线签约。移动生活新方式，随时随地享自如！</p>
          <span class="info-btn" @click="goTarget">立即找房</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import TabComponent from './../components/Tab';
  export default {
    name: 'detail',
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
      data () {
        return this.$store.state.data
      }
    },
    mounted () {
      this.initData(this.data) // 初始化地图
    },
    methods: {
      initData (data) {
        data.map((value) => {
          if (value.id === this.$route.params.id) {
            this.swiperData = value
          }
        })
      },
      goTarget () {
        window.location.href = 'http://sh.m.ziroom.com/'
      }
    },
    components: {
      TabComponent
    }
  }
</script>

<style scoped>
  .content{height:100%;background-color:#1c084f;}
  .swiper-content{height:100%;}
  
  .swiper-slide{position:relative;background-position:center top;background-repeat:no-repeat;background-size:100% auto;}
  .swiper-slide.slide1{background-image:url(/img/bg3.jpg);}
  .swiper-slide.slide2{background-image:url(/img/bg4.jpg);}

  .slide-arrow{position:absolute;left:50%;bottom:.35rem;transform:translateX(-50%);width:.95rem;height:.28rem;}
  .slide-arrow .img{display:block;width:100%;height:100%;}

  .slide-info{width:4.65rem;padding-top:1.6rem;margin:0 auto;text-align:justify;}
  .slide-info .info-text{margin-bottom:.5rem;text-indent:2em;font-size:.26rem;line-height:.66rem;color:#0deff3;}
  .slide-info .info-btn{display:block;margin:0 auto;width:2.46rem;height:.68rem;line-height:.68rem;border-radius:.08rem;background-color:#dfbd03;color:#282828;font-size:.28rem;text-align:center;}
</style>
