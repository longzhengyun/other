<template>
    <div class="model-wrap">
        <div class="player-card">
            <card :data="data" :show="true" :select="true" :selectCards="selectCards" @doAction="doSelect" />
        </div>
        <div v-if="data.length > 0" :class="{ 'player-boss': bossPlayer === 2 }" class="player-info"><p class="count">{{ data.length }}</p>Player2</div>
        <div v-if="gameState && currentPlayer === 2" class="player-btn">
            <div @click="$emit('doAction', 'Play')" class="item">出牌</div>
            <div @click="$emit('doAction', 'Prompt')" class="item">提示</div>
            <div v-if="previousPlayer !== 0 && previousPlayer !== 2" @click="$emit('doAction', 'Pass')" class="item">要不起</div>
        </div>
        <div v-if="previousPlayer === 2"  class="player-prev">
            <card :data="previousCards.data" :show="true" />
        </div>
        <div v-if="(previousPlayer === 1 || previousPlayer === 3) && currentPlayer == 3"  class="player-state">要不起</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from './../store'

import { Poker, Cards } from './../assets/@types'

import Card from './Card.vue'

export default defineComponent({
    name: 'Player2',
    components: {
        Card
    },
    props: {
        data: {
            type: Array,
            default: [],
        },
        gameState: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['doAction'],
    setup(props, { emit }) {
        const store = useStore()

        const doSelect = (item: Poker) => {
            if (props.gameState) {
                emit('doAction', 'Select', item)
            }
        }

        return {
            bossPlayer: computed(() : Number => store.state.bossPlayer),
            currentPlayer: computed(() : Number => store.state.currentPlayer),
            previousPlayer: computed(() : Number => store.state.previousPlayer),
            previousCards: computed(() : Cards => store.state.previousCards),
            selectCards: computed(() : Poker[] => store.state.selectCards),
            doSelect,
        }
    }
})
</script>

<style scoped>
    .model-wrap{position: absolute;bottom:0;left:0;right:0;}
    .player-card{position: absolute;left:50%;bottom:2vw; width:6.3vw;height:8.8vw;overflow:visible;transform:translateX(-50%);}
    .player-info{position: absolute;left:25vw;bottom:2vw;font-size:1.2vw;color:#fff;text-align: center;}
    .player-info .count{border:2px solid #fff;border-radius: 1vw;width:4vw;height:4vw;line-height:4vw;text-align: center;font-size: 2.5vw;margin-bottom: .5vw;}
    .player-prev,
    .player-state{position: absolute;left:50%;bottom:13vw;transform:translateX(-50%);}
    .player-prev{width:6.3vw;height:8.8vw;overflow:visible;}
    .player-state{color:#fff;font-size: 2vw;}
    .player-boss{color:#ffc107;}
    .player-boss .count{border-color: #ffc107;background-image:linear-gradient(#033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7);}
    .player-btn{position: absolute;right:20vw;bottom:2vw;}
    .player-btn .item{margin-top:.5vw;border-radius:1vw;font-size:1.2vw;background-color:#ffc107;color:#fff;border:2px solid #fff;padding:0 .5vw;text-align: center;cursor: pointer;}
</style>