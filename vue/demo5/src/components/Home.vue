<template>
  <swiper
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="home-container"
    loop
  >
    <swiper-slide v-for="(item, index) in slides" :key="index">
      <router-link :to="`/detail/${item['id']}`">
        <img :src="item['image']" class="home-img" alt="">
        <div class="home-info">
          <h3 class="name">{{item['name']}}</h3>
          <p class="content">{{item['content']}}</p>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
// import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue'

import { axiosPost } from './../api';

// SwiperCore.use([Virtual]);

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // slides: [
      //   { id: 1, image: 'https://pic1.zhimg.com/v2-6dfaf094073bc710e3ed4b250e6cd302_1440w.jpg?source=172ae18b', name: '花木兰', content: '华特·迪士尼影片公司出品的真人版剧情电影，由妮基·卡罗执导、刘亦菲、甄子丹领衔主演，巩俐、李连杰特别出演，李截、安柚鑫主演，于2020年9月11日在中国内地上映，因疫情影响部分国家/地区上线迪士尼+付费观看。该片根据迪士尼1998年出品的同名动画片改编，讲述了花木兰女扮男装，代父从军、勇战柔然的故事。' },
      //   { id: 2, image: 'http://5b0988e595225.cdn.sohucs.com/images/20190131/db72e33be16e4c22b09c4bef366f6d55.jpeg', name: '大白鲨', content: '1975年上映的一部的美国惊悚电影，本片是史蒂文·斯皮尔伯格拍摄经典影片之一，根据彼得·本奇利的同名小说改编。主要演员有罗伊·施奈德、理查德·德莱弗斯、罗伯特·肖、莫瑞·汉密尔顿等。影片讲述一个名叫艾米蒂岛的暑期度假小镇近海出现一头巨大的食人大白鲨，多名游客命丧其口，当地警长在一名海洋生物学家和一位职业鲨鱼捕手的帮助下决心猎杀这条鲨鱼。' },
      //   { id: 3, image: 'http://5b0988e595225.cdn.sohucs.com/images/20190131/e6857ff66e41408495fdca16694cc28c.jpeg', name: '战争之王', content: '由安德鲁·尼科尔编剧并执导，尼古拉斯·凯奇、杰瑞德·莱托、布丽姬·穆娜、伊恩·霍姆等主演的犯罪题材类电影，于2005年9月16日（北美）上映。该片是一部关于描绘武器交易世界的电影，讲述了一个发生在乌克兰军火商人尤瑞·奥洛夫身上，充满火爆动作场面的故事。' },
      //   { id: 4, image: 'http://5b0988e595225.cdn.sohucs.com/images/20190131/53a7bffa5e72419d92345b77c757e6ce.jpeg', name: '海洋深处', content: '由朗·霍华德执导的剧情片，克里斯·海姆斯沃斯、本·威士肖、希里安·墨菲、米歇尔·菲尔利等领衔出演。该片改编自同名小说，讲述了1820年一艘捕鲸船于南太平洋被鲸鱼撞沉，幸存的海员在大海上漂流了90天的故事。' },
      //   { id: 5, image: 'http://5b0988e595225.cdn.sohucs.com/images/20190131/769fef31d5fb4873abbc1e146fc3d834.jpeg', name: '泰坦尼克号', content: '美国二十世纪福斯电影公司、派拉蒙影业公司出品爱情片，由詹姆斯·卡梅隆执导，莱昂纳多·迪卡普里奥、凯特·温斯莱特领衔主演。影片以1912年泰坦尼克号邮轮在其处女启航时触礁冰山而沉没的事件为背景，讲述了处于不同阶层的两个人穷画家杰克和贵族女露丝抛弃世俗的偏见坠入爱河，最终杰克把生命的机会让给了露丝的感人故事。' },
      // ],
    }
  },
  async setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    }

    const onSlideChange = () => {
      console.log('swiper');
    }

    const slides = await axiosPost('/movie/on', { cityid: null, city: '武汉', date: '2021-01-01' });

    return {
      onSwiper,
      onSlideChange,
      slides,
    }
  }
}
</script>

<style scoped>
  .home-container {
    width: 100vw;
    height: 100%;
    background-color: #000;
  }
  .home-img {
    display: block;
    width: 100vw;
    height: 148vw;
  }
  .home-info {
    height: calc(100% - 148vw);
    overflow: hidden;
    padding: 0 4vw;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
  }
  .home-info .name {
    font-size: 6vw;
    font-weight: bold;
    line-height: 1;
  }
  .home-info .content {
    margin-top: 1.5vw;
    font-size: 4vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>