<template>
    <div id="app">
        <div class="loading" :style="{ 'background-image': `url(${BASE_URL}img/bg_loading.jpg)` }" v-if="showLoading">
            <div class="progress-icon" :style="{ 'background-image': `url(${BASE_URL}img/icon_loading.png)` }" :class="{ 'hide': showBtn2 }"></div>
            <div class="progress-bar" :class="{ 'hide': showBtn2 }" :style="{ 'height': `${9 * progress}rem`, 'background-image': `url(${BASE_URL}img/loading.jpg)` }"></div>
            <div class="progress-bar2" :class="{ 'hide': showBtn2 }">
                <span class="text">{{parseInt(progress * 100)}}%</span>
            </div>
            <div class="btn-loading" :style="{ 'background-image': `url(${BASE_URL}img/btn_start.png)` }" :class="{ 'show': showBtn2 }" v-show="showBtn" @click="playVideo(1)"></div>
        </div>
        <div class="main">
            <audio id="audio1" :src="`${BASE_URL}audio/bg.mp3`" preload="auto" loop="loop"></audio>
            <audio id="audio2" :src="`${BASE_URL}audio/audio.mp3`" preload="auto" loop="loop"></audio>
            <div class="background" :style="{ 'transform': `translateX(-${current}px)`, 'width': `${bgWidth}px` }" v-show="showBackground">
                <img class="img" :src="`${BASE_URL}img/background.jpg`" />
                <span class="btn-play btn-play2" @click="playVideo(2)">
                    <img class="arrow" :src="`${BASE_URL}img/icon_arrow.png`" />
                </span>
                <span class="btn-play btn-play3" @click="playVideo(3)">
                    <img class="arrow" :src="`${BASE_URL}img/icon_arrow.png`" />
                </span>
                <span class="btn-play btn-play4" @click="playVideo(4)">
                    <img class="arrow" :src="`${BASE_URL}img/icon_arrow.png`" />
                </span>
                <span class="btn-play btn-play5" @click="playVideo(5)">
                    <img class="arrow" :src="`${BASE_URL}img/icon_arrow.png`" />
                </span>
                <span class="btn-play btn-play6" @click="playVideo(6)">
                    <img class="arrow" :src="`${BASE_URL}img/icon_arrow.png`" />
                </span>
                <span class="btn-play btn-play7" @click="playVideo(7)">
                    <img class="arrow" :src="`${BASE_URL}img/icon_arrow.png`" />
                </span>
                <span class="btn-play btn-play8" @click="playVideo(8)">
                    <img class="arrow" :src="`${BASE_URL}img/icon_arrow.png`" />
                </span>
                <div class="mask" v-show="showMask"></div>
            </div>
            <div class="code" :class="{ 'show' : showCode }">
                <img class="img" :src="`${BASE_URL}img/bg_code.jpg`" />
            </div>
            <video
                id="video"
                class="video"
                x5-video-orientation="portrait"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
                x-webkit-airplay="true"
                playsinline="playsinline"
                webkit-playsinline="webkit-playsinline"
                preload="auto"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            BASE_URL: process.env.BASE_URL,
            bgWidth: 0,
            current: 0,
            showBtn: false,
            showBtn2: false,
            showLoading: true,
            showBackground: false,
            showMask: true,
            showCode: false,
            resourceList: [
                { id: 1, uri: `${process.env.BASE_URL}video/video1.mov` },
                { id: 2, uri: `${process.env.BASE_URL}video/video2.mov` },
                { id: 3, uri: `${process.env.BASE_URL}video/video3.mov` },
                { id: 4, uri: `${process.env.BASE_URL}video/video4.mov` },
                { id: 5, uri: `${process.env.BASE_URL}video/video5.mov` },
                { id: 6, uri: `${process.env.BASE_URL}video/video6.mov` },
                { id: 7, uri: `${process.env.BASE_URL}video/video7.mov` },
                { id: 8, uri: `${process.env.BASE_URL}video/video8.mov` },
            ],
            loadingStart: false,
            videoId: 0,
            audio1: null,
            audio2: null,
            video1: null,
            video2: null,
            video3: null,
            video4: null,
            video5: null,
            video6: null,
            video7: null,
            video8: null,
            progress1: 0,
            progress2: 0,
            progress3: 0,
            progress4: 0,
            progress5: 0,
            progress6: 0,
            progress7: 0,
            progress8: 0,
            progress9: 0,
            target1: 0,
            target2: 0,
            target3: 0,
            target4: 0,
            target5: 0,
            target6: 0,
            target7: 0,
        }
    },
    computed: {
        progress() {
            return (this.progress1 + this.progress2 + this.progress3 + this.progress4 + this.progress5 + this.progress6 + this.progress7 + this.progress8 + this.progress9) / 900
        }
    },
    watch: {
        progress(val) {
            if (val === 1) {
                this.showBtn = true;
                setTimeout(() => {
                    this.showBtn2 = true;
                }, 50);
            }
        },
        loadingStart(val) {
            if (val) {
                this.resourceList.map(item => {
                    this.blobLoad(`${document.location.origin}${item.uri}`, item.id);
                })
            }
        }
    },
    mounted () {
        let ua = window.navigator.userAgent;
        if (this.isWeiXin(ua)) {
            // this.setShare() // 配置微信分享

            document.addEventListener('WeixinJSBridgeReady', () => {
                this.setWidth(5823, 1334);
                this.addEventListener(); // 监听视频播放
            }, false);
        } else {
            this.setWidth(5823, 1334);
            this.addEventListener(); // 监听视频播放
        }
    },
    methods: {
        blobLoad(src, id) {
            const _this = this;
            const req = new XMLHttpRequest();
            req.open('GET', src, true);
            req.responseType = 'blob';
            req.onload = function () {
                if (this.status === 200) {
                    const blobSrc = URL.createObjectURL(this.response); // IE10+
                    _this[`video${id}`] = blobSrc;
                }
            };
            req.addEventListener('progress', function (evt) {
                _this[`progress${id}`] = parseInt(evt.loaded / evt.total * 100);
            });
            req.onerror = function () {};
            req.send();
        },
        addEventListener() {
            this.audio1 = document.getElementById('audio1');
            this.audio1.addEventListener('canplaythrough', () => {
                this.loadingStart = true;
            })

            this.audio2 = document.getElementById('audio2');
            this.audio2.addEventListener('canplaythrough', () => {
                this.progress9 = 100;
            })

            let ua = window.navigator.userAgent;
            if (this.isWeiXin(ua)) {
                this.audio1.load();
                this.audio2.load();
            }

            this.video = document.getElementById('video');
            this.video.addEventListener('ended', () => {
                this.video.classList.remove('show');
                this.video.classList.add('hide');

                if (this.videoId === 1) {
                    this.showBackground = true;
                    this.audio1.play();
                    this.animation(this.target1, 1);
                }

                if (this.videoId === 2) {
                    this.animation(this.target2, 10);
                }

                if (this.videoId === 3) {
                    this.animation(this.target3, 10);
                }

                if (this.videoId === 4) {
                    this.animation(this.target4, 10);
                }

                if (this.videoId === 5) {
                    this.animation(this.target5, 10);
                }

                if (this.videoId === 6) {
                    this.animation(this.target6, 10);
                }

                if (this.videoId === 7) {
                    this.animation(this.target7, 10);
                }

                if (this.videoId === 8) {
                    this.showCode = true;
                }
            })
        },
        setWidth(width, height) {
            this.bgWidth = document.body.clientHeight * width / height;
            this.current = this.bgWidth - document.body.clientWidth;

            this.target2 = 1060 * this.bgWidth / width;
            this.target3 = 1660 * this.bgWidth / width;
            this.target4 = 2220 * this.bgWidth / width;
            this.target5 = 3290 * this.bgWidth / width;
            this.target6 = 4280 * this.bgWidth / width;
            this.target7 = 5070 * this.bgWidth / width;

            let btnPlay = document.getElementsByClassName('btn-play');
            let btnWidth = 520 * this.bgWidth / width;
            Array.prototype.forEach.call(btnPlay, (element, index) => {
                let btnLeft = 0;
                if (index === 0) {
                    btnLeft = 140;
                }
                if (index === 1) {
                    btnLeft = 1190;
                }
                if (index === 2) {
                    btnLeft = 1780;
                }
                if (index === 3) {
                    btnLeft = 2364;
                }
                if (index === 4) {
                    btnLeft = 3440;
                }
                if (index === 5) {
                    btnLeft = 4400;
                }
                if (index === 6) {
                    btnLeft = 5160;
                }
                element.setAttribute('style', `width:${btnWidth}px;left:${btnLeft * this.bgWidth / width}px`);
            });
        },
        animation(target, step) {
            this.showMask = true;
            if (this.current < target) {
                this.timer = setInterval(() => {
                    if (this.current >= target) {
                        this.current = target;
                        this.showMask = false;
                        clearInterval(this.timer);
                        return false;
                    }
                    this.current += 5;
                }, step);
            }
            if (this.current > target) {
                this.timer = setInterval(() => {
                    if (this.current <= target) {
                        this.current = target;
                        this.showMask = false;
                        clearInterval(this.timer);
                        return false;
                    }
                    this.current -= 5;
                }, step);
            }
        },
        playVideo(id) {
            if (id === 1) {
                this.showLoading = false;
                this.audio2.play();

                setTimeout(() => {
                    this.audio2.pause();
                }, 8000);
            }
            this.videoId = id;
            this.video.setAttribute('src', this[`video${id}`]);
            this.video.classList.remove('hide');
            this.video.classList.add('show');
            this.video.play();
        },
        isWeiXin(u) {
            let ua = u.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        setShare () {
            let shareImg = 'http://ziroom.shkemin.com/img/icon_share.jpg';
            let shareTitle = '自如客住上海吃趴浪';
            let shareDesc = "吃|寻遍魔都奇珍异宝\n趴|躺?睡?站?好玩不过轰趴\n浪|无风不起浪里个浪";
            let shareLink = window.location.href.split('#')[0];

            let formData = new FormData();
            formData.append('url', shareLink);
            this.$ajax.post('/api/share', formData).then((res) => {
                this.initShare(res.data, shareImg, shareTitle, shareDesc); // 初始化数据
            }).catch((error) => {
                window.console.log(error);
            })
        },
        initShare (data, imgUrl, title, desc) {
            window.wx.config({
                debug: false,
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
            })

            window.wx.ready(function() {
                let shareConfig = {
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: data.url, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
                }
                //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                window.wx.onMenuShareTimeline(shareConfig)
                //获取“分享给朋友”按钮点击状态及自定义分享内容接口
                window.wx.onMenuShareAppMessage(shareConfig)
                //获取“分享到QQ”按钮点击状态及自定义分享内容接口
                window.wx.onMenuShareQQ(shareConfig)
                //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
                window.wx.onMenuShareWeibo(shareConfig)
                //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                window.wx.onMenuShareQZone(shareConfig)

                window.wx.error((res) => {
                    window.console.log(res.errMsg)
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                })
            })
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
};
</script>

<style>
article,
aside,
blockquote,
body,
button,
code,
dd,
details,
div,
dl,
dt,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
hr,
input,
legend,
li,
menu,
nav,
ol,
p,
pre,
section,
td,
textarea,
th,
ul {
    margin: 0;
    padding: 0;
}
body,
button,
input,
select,
textarea {
    font: 400 0.3rem/1.5 -apple-system, BlinkMacSystemFont, PingFang SC,
        Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
    color: #333;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
iframe,
menu,
nav,
section {
    display: block;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: 100%;
    font-weight: 500;
}
address,
cite,
dfn,
em,
i,
var {
    font-style: normal;
    font-weight: 400;
}
body,
html {
    height: 100%;
}
dfn {
    font-family: Arial;
}
ol,
ul {
    list-style: none;
}
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
img {
    max-width: 100%;
    height: auto;
}
a {
    color: #333;
    text-decoration: none;
}
button,
fieldset,
img,
input {
    border: 0;
}
button,
input,
select,
textarea {
    font-size: 100%;
}
button,
input[type="button"],
input[type="submit"] {
    line-height: normal !important;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
input,
textarea {
    border: 0;
    background: transparent;
    box-sizing: border-box;
    outline: 0;
    -webkit-appearance: none;
    border-radius: 0;
}
body {
    overflow-x: hidden;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    user-select: none;
    -webkit-overflow-scrolling: touch;
}
:focus {
    outline: 0;
}
.ellips {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.clearfix:after {
    clear: both;
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    line-height: 0;
}

#app {
    height: 100%;
}
</style>
<style scoped>
.loading{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    overflow: hidden;
    background-color: #ae2e2b;
    background-repeat: no-repeat;
    background-size: cover;
}
.btn-loading{
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 5;
    width: 4.28rem;
    height:1.09rem;
    transform: translate(-50%, -50%);
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0;
    transition: 1s;
}
.btn-loading.show{
    opacity: 1;
}
.progress-icon{
    position: absolute;
    top: 2.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4.5rem;
    height: 1.15rem;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 1;
    transition: 1s;
}
.progress-icon.hide{
    opacity: 0;
}
.progress-bar{
    position: absolute;
    top: 3.1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3.16rem;
    height: 9rem;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 1;
    transition: 1s;
}
.progress-bar.hide{
    opacity: 0;
}
.progress-bar2{
    position: absolute;
    top: 2.1rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
    transition: 1s;
}
.progress-bar2.hide{
    opacity: 0;
}
.progress-bar2 .text{
    font-size: 0.32rem;
    color: #fff;
    text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
}

.video{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    transition: 0.5s ease-in-out;
}
.video.show{
    transform: scale(1);
    opacity: 1;
}
.video.hide{
    transform: scale(0.01);
    opacity: 0;
}

.main{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    background-color: #6d4f2b;
}

.background{
    width: 100%;
    height: 100%;
}
.background .img{
    display: block;
    width: 100%;
    height: 100%;
}
.background .mask{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
}

.btn-play{
    position: absolute;
    top: 0;
    height: 100%;
}
.btn-play .arrow{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.68rem;
    height: 0.7rem;
    animation: arrowAni 1s infinite;
}
.btn-play3 .arrow{
    margin-top: -3.5rem;
    margin-left: 1rem;
}
.btn-play4 .arrow{
    margin-top: 1.5rem;
    margin-left: -0.75rem;
}

.code{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left:0 ;
    z-index: 10;
    overflow: hidden;
    transform: scale(0.001);
    opacity: 0;
    /* transition: 1s ease-in-out; */
}
.code.show{
    transform: scale(1);
    opacity: 1;
}
.code .img{
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
}

@keyframes arrowAni
{
    0% {transform: translate(0, 0);}
    50% {transform: translate(0.1rem, 0.1rem);}
    100% {transform: translate(0, 0);}
}
</style>
