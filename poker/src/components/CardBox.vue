<template>
    <div class="model-wrap">
        <div class="player-card">
            <card :data="data" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Card from './Card.vue'

export default defineComponent({
    name: 'CardBox',
    components: {
        Card
    },
    props: {
        data: {
            type: Array,
            default: [],
        },
    },
})
</script>

<style scoped>
    .model-wrap{position: absolute;top:0;left:0;right:0;}
    .player-card{position: absolute;left:50%;top:2vw; width:6.3vw;height:8.8vw;overflow:visible;transform:translateX(-50%);}
</style>