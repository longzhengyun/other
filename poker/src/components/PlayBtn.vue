<template>
    <div @click="btnAction" class="model-btn">
        <span v-if="data === 1">洗牌</span>
        <span v-if="data === 2">发牌</span>
        <span v-if="data === 3">抢地主</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PlayBtn',
    props: {
        data: Number
    },
    setup(props, { emit }) {
        // 出牌
        const btnAction = () => {
            emit('doAction', props.data)
        }

        return {
            btnAction,
        }
    }
})
</script>

<style scoped>
    .model-btn{position: fixed;top:50%;left:50%;transform: translate(-50%, -50%);z-index:500;cursor: pointer;font-size: 4vw;}
</style>