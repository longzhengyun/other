<template>
    <div class="model-Text">
        本局地主为：
        <span v-if="data === 1">Player 1</span>
        <span v-if="data === 2">Player 2</span>
        <span v-if="data === 3">Player 3</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SetBoss',
    props: {
        data: Number
    }
})
</script>

<style scoped>
    .model-Text{position: fixed;top:10vw;left:50%;transform: translateX(-50%);font-size: 3vw;}
</style>