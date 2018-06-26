<template>
  <div class="header" v-if="config.showHeader">
    <!-- title -->
    <h1 class="header-title">{{config.title}}</h1>
    <!-- back -->
    <span class="header-icon icon-back" v-if="config.showBack" @click="goBack"></span>
    <!-- share -->
    <span class="header-icon icon-share" v-if="config.showShare" @click="doShare"></span>
  </div>
</template>

<script>
  export default {
    name: 'HeaderComponent',
    props: ['config'],
    methods: {
      goBack () {
        this.$router.go(-1);
      },
      doShare () {
        this.$store.commit('shareShow', true)
      }
    }
  }
</script>

<style scoped>
.header{position:fixed;top:0;right:0;left:0;z-index:99;height:1rem;}
.header .header-title{margin:0 1.1rem;text-align:center;font-size:.34rem;font-weight:normal;line-height:1rem;color:#fff;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;}
.header .header-icon{position:absolute;top:0;width:1rem;height:1rem;}
.header .icon-back{left:0;}
.header .icon-back::after{content:'';position:absolute;top:50%;left:50%;width:.25rem;height:.25rem;border:1px solid;border-color:transparent transparent #fff #fff;transform:translate(-25%, -50%) rotate(45deg);}
.header .icon-share{right:0;background:url(/img/icon_share.png) center center no-repeat;background-size:50% 50%;}
</style>
