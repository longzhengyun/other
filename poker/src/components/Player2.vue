<template>
    <div class="model-wrap">
        <div class="player-card">
            <card :data="data" :show="true" :select="true" :selectCards="selectCards" @doAction="doSelect" />
        </div>
        <div v-if="data.length > 0" :class="{ 'player-boss': bossPlayer === 2 }" class="player-info"><p class="count">{{ data.length }}</p>Player2</div>
        <div v-if="gameState" class="player-btn">
            <div @click="$emit('doAction', 'Play')" class="item">出牌</div>
            <div @click="$emit('doAction', 'Prompt')" class="item">提示</div>
            <div v-if="previousPlayer !== 2" @click="$emit('doAction', 'Pass')" class="item">要不起</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { Poker } from './../assets/@types';

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
            previousPlayer: computed(() : Number => store.state.previousPlayer),
            selectCards: computed(() : Number => store.state.selectCards),
            doSelect,
        }
    }
})
</script>

<style scoped>
    .model-wrap{position: absolute;bottom:0;left:0;right:0;}
    .player-card{position: absolute;left:50%;bottom:3vw; width:6.3vw;height:8.8vw;overflow:visible;transform:translateX(-50%);}
    .player-info{position: absolute;left:30vw;bottom:4.5vw; font-size:14px;color:#fff;}
    .player-info .count{border:2px solid #fff;border-radius: 6px;width:3vw;height: 3vw;line-height: 3vw;text-align: center;font-size: 2vw;margin-bottom: .5vw;}
    .player-boss{color:#ffc107;}
    .player-boss .count{border-color: #ffc107;background-image:linear-gradient(#033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7);}
    .player-btn{position: absolute;right:24vw;bottom:3vw;}
    .player-btn .item{margin-top:10px;border-radius: 6px;font-size:14px;background-color:#ffc107;color:#fff;border:2px solid #fff;padding:2px 5px;text-align: center;cursor: pointer;}
</style>