<template>
    <div class="model-wrap">
        <div class="model-card">
            <card :data="data" :show="show" :open="true" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Card from './Card.vue'

export default defineComponent({
    name: 'BossCard',
    components: {
        Card
    },
    props: {
        data: {
            type: Array,
            default: [],
        },
        show: {
            type: Boolean,
            default: false,
        },
    }
})
</script>

<style scoped>
    .model-wrap{position: fixed;top:14vw;left:50%;transform: translateX(-50%);}
    .model-card{width:6.3vw;height:8.8vw;overflow:visible;}
</style>