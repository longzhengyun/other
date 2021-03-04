<template>
    <div class="model-wrap">
        <h3 class="model-title">Card Box</h3>
        <ul class="model-list">
            <li v-for="(item, key) in data" :key="key" class="model-item">Card {{ key + 1 }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardBox',
    props: {
        data: Array
    }
})
</script>

<style scoped>
    .model-wrap{position: fixed;top:0;left:0;right:0;}
    .model-title{position: absolute;top:0;left:50%;transform: translateX(-50%);font-size: 5vw;font-weight: bold;opacity: .1;}
    .model-list{display: flex;justify-content: center;}
    .model-item{width:1vw;font-size: 1vw;text-align: center;line-height: 1;padding: 2vw .2vw;font-weight: bold;writing-mode:vertical-rl;}
</style>