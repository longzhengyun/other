<template>
    <div @click="$emit('doAction', data)" class="model-btn">
        <div v-if="data === 1" class="item">洗牌</div>
        <div v-if="data === 2" class="item">发牌</div>
        <div v-if="data === 3" class="item">抢地主</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PlayBtn',
    props: {
        data: {
            type: Number,
            default: 0,
        },
    },
    emits: ['doAction'],
})
</script>

<style scoped>
    .model-btn{position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);}
    .model-btn .item{border-radius: 6px;font-size:28px;background-color:#ffc107;color:#fff;border:2px solid #fff;padding:5px 20px;cursor: pointer;}
</style>