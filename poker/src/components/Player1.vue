<template>
    <div class="model-wrap">
        <div class="player-card">
            <card :data="data" />
        </div>
        <div v-if="data.length > 0" :class="{ 'player-boss': bossPlayer === 1 }" class="player-info"><p class="count">{{ data.length }}</p> Player1</div>
        <div v-if="previousPlayer === 1"  class="player-prev">
            <card :data="previousCards.data" :show="true" />
        </div>
        <div v-if="(previousPlayer === 2 || previousPlayer === 3) && currentPlayer == 2"  class="player-state">要不起</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from './../store'

import { Cards } from './../assets/@types'

import Card from './Card.vue'

export default defineComponent({
    name: 'Player1',
    components: {
        Card,
    },
    props: {
        data: {
            type: Array,
            default: [],
        },
    },
    setup() {
        const store = useStore()

        return {
            bossPlayer: computed(() : Number => store.state.bossPlayer),
            currentPlayer: computed(() : Number => store.state.currentPlayer),
            previousPlayer: computed(() : Number => store.state.previousPlayer),
            previousCards: computed(() : Cards => store.state.previousCards),
        }
    }
})
</script>

<style scoped>
    .model-wrap{position: absolute;top:0;bottom: 0;left:0;}
    .player-card{position: absolute;top:40%;left:-1vw; width:6.3vw;height:8.8vw;overflow:visible;transform:rotate(90deg) translateY(-50%);}
    .player-info{position: absolute;top:3vw;left:2.2vw;font-size:1.2vw;color:#fff;text-align: center;}
    .player-info .count{border:2px solid #fff;border-radius: 1vw;width:4vw;height:4vw;line-height:4vw;text-align: center;font-size: 2.5vw;margin-bottom: .5vw;}
    .player-prev,
    .player-state{position: absolute;top:55%;left:13vw;transform:translateY(-50%);}
    .player-state{color:#fff;font-size: 2vw;word-break: keep-all;}
    .player-boss{color:#ffc107;}
    .player-boss .count{border-color: #ffc107;background-image:linear-gradient(#033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7);}
</style>