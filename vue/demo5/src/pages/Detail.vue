<template>
    <div class="container">
        <h2 class="title">{{ state.articleDetail.title }}</h2>
        <div class="more">
            <p>{{ state.articleDetail.category }}</p>
            <p>{{ state.articleDetail.date }}</p>
        </div>
        <div v-html="state.articleDetail.content" class="content" />
    </div>
</template>

<script lang="ts">
import { axiosGet } from './../api';

import { defineComponent, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface State {
    id: number,
    articleDetail: object,
}

export default defineComponent({
    name: 'Detail',
    components: {},
    setup() {
        const state: State = reactive({
            id: 0,
            articleDetail: {}
        })

        const router = useRoute();
        state.id = router.params.id ? Number(router.params.id) : 0

        // 获取热门文章详情
        const getArticleDetail = async (id: number) => {
            const { code, data } : { code: number, data: object } = await axiosGet('/article/detail', { id });

            if (code === 0) {
                state.articleDetail = data
            }
        }

        onMounted(() => {
            getArticleDetail(state.id) // 获取热门文章详情
        })

        return {
            state,
            getArticleDetail,
        }
    }
})
</script>

<style scoped>
    .container{background-color: #eee;}
    .title{font-size: 6vw;padding: 4vw;}
    .more{display: flex;justify-content: space-between; background-color: #fff;padding: 2vw 4vw;color:#666;}
    .content{padding: 2vw 4vw;}
</style>