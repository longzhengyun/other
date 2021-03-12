<template>
    <div class="model-wrap">
        <div class="player-card">
            <card :data="data" />
        </div>
        <div v-if="data.length > 0" :class="{ 'player-boss': bossPlayer === 3 }" class="player-info"><p class="count">{{ data.length }}</p>Player3</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from './../store'

import Card from './Card.vue'

export default defineComponent({
    name: 'Player3',
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
        }
    }
})
</script>

<style scoped>
    .model-wrap{position: absolute;top:0;bottom: 0;right:0;}
    .player-card{position: absolute;bottom:50%;right:3vw; width:6.3vw;height:8.8vw;overflow:visible;transform:rotate(-90deg) translateX(-50%);}
    .player-info{position: absolute;bottom:3vw;right:2vw;font-size:1.2vw;color:#fff;text-align: center;}
    .player-info .count{border:2px solid #fff;border-radius: 1vw;width:4vw;height:4vw;line-height:4vw;text-align: center;font-size: 2.5vw;margin-bottom: .5vw;}
    .player-boss{color:#ffc107;}
    .player-boss .count{border-color: #ffc107;background-image:linear-gradient(#033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7);}
</style>