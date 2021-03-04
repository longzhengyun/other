<template>
    <div class="model-wrap">
        <h3 class="model-title">Player 1</h3>
        <ul class="model-list">
            <li v-for="(item, key) in data" :key="key" class="model-item">Card {{ key + 1 }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Player1',
    components: {},
    props: {
        data: Array
    }
})
</script>

<style scoped>
    .model-wrap{position: fixed;top:0;left:0;bottom:0;}
    .model-title{position: absolute;top:50%;left:0;transform: translateY(-50%);font-size: 5vw;font-weight: bold;opacity: .1;writing-mode:vertical-rl;}
    .model-list{position:relative;display: flex;justify-content: center;flex-direction: column;height: 100vh;}
    .model-item{height:1vw;font-size: 1vw;text-align: left;line-height: 1;padding: .2vw 2vw;font-weight: bold;}
</style>