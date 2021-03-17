<template>
    <div class="model-wrap">
        <div class="model-player">
            <span v-if="data === 1">Player 1 获胜</span>
            <span v-if="data === 2">恭喜您获胜了！</span>
            <span v-if="data === 3">Player 3 获胜</span>
        </div>
        <div @click="$emit('doAction')" class="model-btn">再来一局</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Winner',
    props: {
        data: {
            type: Number,
            default: 0,
        }
    },
    emits: ['doAction'],
})
</script>

<style scoped>
    .model-wrap{position: fixed;top:50%;left:50%;transform: translate(-50%, -50%);background-color: #fff;border:2px solid #ffc107;border-radius:1vw;padding: 3vw;}
    .model-player{width:30vw;font-size: 3vw;text-align: center;}
    .model-btn{margin-top: 2vw;font-size: 2vw;text-align: center;background-color: #ffc107;border-radius:1vw;padding: 1vw;color: #fff;}
</style>