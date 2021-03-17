<template>
    <div class="table-wrap">
        <slot name="playBtn" />
        <slot name="cardBox" />
        <slot name="bossCard" />
        <slot name="player1" />
        <slot name="player2" />
        <slot name="player3" />
        <slot name="winner" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CardTable',
})
</script>

<style scoped>
    .table-wrap{position:relative;width:100vw;height:56.22vw;overflow:hidden;background-image:radial-gradient(#1e92c7, #033e76 70%);}
</style>