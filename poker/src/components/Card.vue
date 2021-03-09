<template>
    <ul class="card-wrap">
        <li v-for="(item, key) in data" :key="key" :class="{ 'selected': selectCards.includes(item), 'open': open }" class="card-item">
            <div :class="{ 'card-back': !show, 'card-red': item.type === 1 || item.type === 3, 'card-btn': select }" @click="$emit('doAction', item)" class="card-box">
                <template v-if="show">
                    <div class="card-name">
                        {{ item.name }}
                        <div v-if="item.id !== 53 && item.id !== 54">
                            <template v-if="item.type === 0">&spades;</template>
                            <template v-if="item.type === 1">&hearts;</template>
                            <template v-if="item.type === 2">&clubs;</template>
                            <template v-if="item.type === 3">&diams;</template>
                        </div>
                    </div>
                    <div class="card-name card-copy">
                        {{ item.name }}
                        <template v-if="item.id !== 53 && item.id !== 54">
                            <template v-if="item.type === 0">&spades;</template>
                            <template v-if="item.type === 1">&hearts;</template>
                            <template v-if="item.type === 2">&clubs;</template>
                            <template v-if="item.type === 3">&diams;</template>
                        </template>
                    </div>
                    <div class="card-bg">{{ item.name.length > 3 ? item.name.substring(0, 1) : item.name }}</div>
                </template>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Card',
    props: {
        data: {
            type: Array,
            default: [],
        },
        show: {
            type: Boolean,
            default: false,
        },
        open: {
            type: Boolean,
            default: false,
        },
        select: {
            type: Boolean,
            default: false,
        },
        selectCards: {
            type: Array,
            default: [],
        },
    },
    emits: ['doAction'],
})
</script>

<style scoped>
    .card-wrap{display:flex;justify-content:center;}
    .card-item{width:1.5vw;height: 8.8vw;overflow:visible;}
    .card-item.selected{transform: translateY(-1vw);}
    .card-item.open{width: 6.3vw;margin:0 .5vw;}
    .card-box{position:relative;width:6.3vw;height:100%;border:2px solid #fff;border-radius:6px;background-color:#fff;color:black;box-sizing:border-box;box-shadow:1px 1px 3px rgba(0, 0, 0, .5);font-family:fantasy;}
    .card-back{background-image:radial-gradient(#033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7, #033e76, #1e92c7);}
    .card-name{width:14px;padding:5px 0;font-size:14px;line-height:14px;word-break:break-all;text-align: center;}
    .card-copy{position:absolute;right:0;bottom:0;transform:rotateZ(180deg);}
    .card-bg{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);font-size:80px;opacity:.05;}
    .card-red{color:red;}
    .card-btn{cursor: pointer;}
</style>