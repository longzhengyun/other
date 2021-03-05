<template>
    <div class="model-wrap">
        <p v-if="previousPlayer !== 0">
            上一张牌为：{{ previousPoker.name }}，出牌玩家为：
            <span v-if="previousPlayer === 1">Player 1</span>
            <span v-if="previousPlayer === 2">Player 2</span>
            <span v-if="previousPlayer === 3">Player 3</span>
        </p>
        <p>
            当前出牌玩家为：
            <span v-if="currentPlayer === 1">Player 1</span>
            <span v-if="currentPlayer === 2">Player 2</span>
            <span v-if="currentPlayer === 3">Player 3</span>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CardTable',
    props: {
        currentPlayer: Number,
        previousPlayer: Number,
        previousPoker: Object,
    }
})
</script>

<style scoped>
    .model-wrap{position: fixed;bottom:20vw;left:50%;transform: translateX(-50%);font-size: 2vw;text-align: center;}
</style>