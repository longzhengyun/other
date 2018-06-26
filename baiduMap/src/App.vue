<template>
  <div id="app">
    <header-component :config="curHeaderConfig"></header-component>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <share-component :config="curShareConfig"></share-component>
  </div>
</template>

<script>
  import allData from './../public/data.json';
  import HeaderComponent from './components/Header';
  import ShareComponent from './components/Share';
  export default {
    name: 'app',
    data () {
      return {
        curHeaderConfig: {},
        curShareConfig: {
          url: 'http://sh.m.ziroom.com/', // 网址，默认使用 window.location.href
          source: 'http://sh.m.ziroom.com/', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title: '自如客住上海吃趴浪', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          description: '品质房源、线上订房、非中介！高品质租房品牌“自如”让您享受高品质生活。自如承诺：3天不满意全额退款！自如网区域找房提供准确的上海租房信息和上海租房价格。', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
          image: '', // 图片, 默认取网页中第一个img标签
          sites: ['weibo', 'qq', 'qzone','douban', 'linkedin'], // 启用的站点
          disabled: ['google', 'facebook', 'twitter'] // 禁用的站点
          // wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
          // wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
        }
      }
    },
    computed: {
      headerConfig () {
        return this.$store.state.headerConfig
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': function (val) {
        this.setConfig(val)
      }
    },
    created () {
      this.initData(allData) // 初始化地图
      this.setConfig(this.$route) // 设置header 配置信息
    },
    methods: {
      setConfig (value) {
        let path = value.path
        let config = {}

        if (this.checkSystem() === 'wx') {
          config.showHeader = false
        } else {
          config.showHeader = true
        }

        // index
        if (path === '/index') {
            config.showBack = false
        }

        this.curHeaderConfig = Object.assign({}, this.headerConfig, config) // 将新值和默认值合并到空对象中 解决直接修改子属性组件不更新问题
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
      },
      getObj (name, value) {
        return {
          name: value[name + ':business:name'],
          star: value[name + ':business:star'],
          evaluate: value[name + ':business:evaluate'],
          logo: value[name + ':business:logo'],
        }
      },
      checkSystem () {
        let u = window.navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        let isWx = false
        if (u.match(/MicroMessenger/i)) {
          isWx = u.match(/MicroMessenger/i).toString() === 'MicroMessenger'
        }
        if (isWx) {
          return 'wx'
        } else {
          if (isAndroid) {
            return 'andriod'
          } else if (isIos) {
            return 'iOS'
          }
        }
      }
    },
    components: {
      HeaderComponent,
      ShareComponent
    }
  }
</script>

<style>
  #app{height:100%;}
</style>
