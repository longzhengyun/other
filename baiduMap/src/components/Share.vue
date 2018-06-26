<template>
  <transition name="fade" mode="out-in">
    <div class="share-wrap" v-show="shareShow" @click="hideShare">
      <div class="social-share"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ShareComponent',
    props: ['config'],
    mounted () {
      window.$('.social-share').share(this.config)
    },
    computed: {
      shareShow () {
        return this.$store.state.shareShow
      }
    },
    methods: {
      hideShare (e) {
        if (!e.target || e.target.className.indexOf('social-share-icon') < 0) {
          this.$store.commit('shareShow', false)
        }
      }
    }
  }
</script>

<style scoped>
.share-wrap{position:absolute;top:0;right:0;bottom:0;left:0;z-index:100;background-color:rgba(0, 0, 0, .7);}
.social-share{position:absolute;left:0;right:0;bottom:0;padding:.5rem 0;text-align:center;}
.social-share >>> .social-share-icon{position:relative;width:.8rem;height:.8rem;padding:.1rem;font-size:.6rem;margin:.25rem .5rem;}
.social-share >>> .social-share-icon::before{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);}
</style>
