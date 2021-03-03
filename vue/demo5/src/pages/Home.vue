<template>
    <ul class="list">
        <li v-for="(item, key) in state.articleHot" :key="key" @click="goDetail(item.id)" class="list-item">{{ item.title }}</li>
    </ul>
</template>

<script lang="ts">
import { axiosGet } from './../api';

import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface State {
    articleHot: object[]
}

export default defineComponent({
    name: 'Home',
    components: {},
    setup() {
        const state: State = reactive({
            articleHot: []
        })

        const router = useRouter();

        // 获取热门文章
        const getArticleHot = async () => {
            const { code, data } : { code: number, data: object[] } = await axiosGet('/article/hot');

            if (code === 0) {
                state.articleHot = data
            }
        }

        // 跳转详情
        const goDetail = (id: number) => {
            router.push(`/detail/${id}`)
        }

        onMounted(() => {
            getArticleHot() // 获取热门文章
        })

        return {
            state,
            getArticleHot,
            goDetail,
            listColor: '#fff' // css 变量
        }
    }
})
</script>

<style scoped>
    .list{height:100vh;box-sizing: border-box; padding: 2vw 0;background-color: #eee;}
    .list-item{padding: 2vw 4vw;}
    .list-item:nth-child(even){background-color: v-bind(listColor);}
</style>