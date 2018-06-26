<template>
  <div class="content" :class="{ 'cont-bg' : selectShow }">
    <div class="title"><img class="img" src="/img/bg2_title.png" /></div>
    <div class="btn-change" @click="changeSelect">{{btnChangeText}}</div>
    <select-component class="select" :data="data" v-if="selectShow" @goTarget="goTarget"></select-component>
    <map-component :data="data" v-else @goTarget="goTarget"></map-component>
  </div>
</template>

<script>
  import MapComponent from "./../components/Map";
  import SelectComponent from "./../components/Select";
  export default {
    name: 'tradeArea',
    data () {
      return {
        btnState: false,
        btnChangeText: '列表筛选'
      }
    },
    computed: {
      data () {
        return this.$store.state.data
      },
      selectShow () {
        return this.$store.state.selectShow
      }
    },
    methods: {
      goTarget (id, point) {
        this.$store.commit('selectPoint', point)
        this.$router.push({ path: '/tradeArea/' + id  });
      },
      changeSelect () {
        if (this.btnState) {
          this.btnChangeText = '列表筛选'
        } else {
          this.btnChangeText = '地图筛选'
        }
        this.btnState = !this.btnState
        this.$store.commit('selectShow', !this.selectShow)
      }
    },
    components: {
      MapComponent,
      SelectComponent
    }
  }
</script>

<style scoped>
  .content{position:relative;height:100%;}
  .content.cont-bg{background:url(/img/bg2.jpg) center bottom no-repeat;background-size:100% auto;}

  .title{position:absolute;top:1.4rem;left:50%;z-index:99;transform:translateX(-50%);width:6.02rem;height:1.91rem;}
  .title .img{display:block;width:100%;height:100%;}

  .select{position:absolute;top:3.8rem;bottom:2.7rem;left:50%;transform:translateX(-50%);z-index:98;}

  .btn-change{position:absolute;right:.6rem;bottom:.6rem;z-index:99;padding:0 .125rem;color:#edd83b;font-size:.24rem;line-height:.4rem;border:1px solid #edd83b;border-radius:.4rem;}
</style>
