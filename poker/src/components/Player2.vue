<template>
    <div class="model-wrap">
        <h3 class="model-title">Player 2</h3>
        <ul class="model-list">
            <li v-for="(item, key) in data" :key="key" @click="state.gameState && doPlay(item)" class="model-item">{{ item.name }}</li>
        </ul>
        <div v-if="state.gameState" @click="doPlay(null)" class="model-btn">要不起</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface State {
    gameState: Boolean
}

export default defineComponent({
    name: 'Player2',
    components: {},
    props: {
        data: Array,
        state: Boolean
    },
    setup(props, { emit }) {
        const state: State = reactive({
            gameState: props.state
        })

        // 出牌
        const doPlay = (item: object) => {
            emit('doAction', item)
        }

        return {
            state,
            doPlay,
        }
    }
})
</script>

<style scoped>
    .model-wrap{position: fixed;bottom:0;left:0;right:0;}
    .model-title{position: absolute;bottom:0;left:50%;transform: translateX(-50%);font-size: 5vw;font-weight: bold;opacity: .1;}
    .model-list{position:relative;display: flex;justify-content: center;}
    .model-item{width:1vw;font-size: 1vw;text-align: center;line-height: 1;padding: 2vw .2vw;font-weight: bold;writing-mode:vertical-rl;cursor: pointer;}
    .model-btn{position: absolute;bottom:15vh;left:50%;transform: translateX(-50%);font-size: 2vw;font-weight: bold;cursor: pointer;}
</style>