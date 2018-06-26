<template>
  <div class="content">
    <div class="title"><img class="img" src="/img/bg1_title.png" /></div>
    <span class="btn" @click="goTarget"></span>
  </div>
</template>

<script>
  export default {
    name: 'index',
    mounted () {
    },
    methods: {
      goTarget () {
        this.$router.push({ path: '/tradeArea' });
      }
    }
  }
</script>

<style scoped>
  .content{position:relative;height:100%;min-height:12rem;background:#1b094e url(/img/bg1.jpg) center bottom no-repeat;background-size:100% auto;}
  .title,
  .btn{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);}
  .title{margin-top:-2rem;margin-left:-.75rem;width:2.41rem;height:5.14rem;}
  .title .img{display:block;width:100%;height:100%;}
  .btn{margin-top:.75rem;margin-left:.75rem;width:1.16rem;height:1.16rem;background:url(/img/bg1_btn.png) no-repeat;background-size:contain;}
</style>
