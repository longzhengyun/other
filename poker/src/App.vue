<template>
    <play-btn v-if="state.showBtn" :data="state.btnType" @doAction="btnAction" />
    <card-box :data="state.cardBox" />
    <set-boss v-if="state.showSetBoss" :data="state.bossValue" />
    <player1 :data="state.player1" />
    <player2 :data="state.player2" :state="state.gameState" @doAction="playAction" />
    <player3 :data="state.player3" />
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';

import poker from './assets/data/poker.json'

import PlayBtn from './components/PlayBtn.vue';
import SetBoss from './components/SetBoss.vue';
import CardBox from './components/CardBox.vue';
import Player1 from './components/Player1.vue';
import Player2 from './components/Player2.vue';
import Player3 from './components/Player3.vue';

interface Poker {
    id: number,
    name: string,
    value: number,
    type: number,
}

interface State {
    btnType: number,
    showBtn: boolean,
    dealIndex: number,
    cardBox: Poker[],
    bossValue: number,
    showSetBoss: boolean,
    currentPlayer: number,
    currentPoker: Poker,
    previousPoker: Poker,
    gameState: boolean,
    player1: Poker[],
    player2: Poker[],
    player3: Poker[],
}

export default defineComponent({
    name: 'Index',
    components: {
        PlayBtn,
        SetBoss,
        CardBox,
        Player1,
        Player2,
        Player3,
    },
    setup() {
        const state: State = reactive({
            btnType: 1,
            showBtn: true,
            dealIndex: 1,
            cardBox: [],
            bossValue: 0,
            showSetBoss: false,
            currentPlayer: 0,
            currentPoker: {
                id: 0,
                name: '',
                value: 0,
                type: 0,
            },
            previousPoker: {
                id: 0,
                name: '',
                value: 0,
                type: 0,
            },
            gameState: false,
            player1: [],
            player2: [],
            player3: [],
        })

        // 监听当前玩家
        watch(() => state.currentPlayer, (currentPlayer: number) => {
            if (currentPlayer === 1) { // Player 1

            }

            if (currentPlayer === 3) { // Player 3

            }
        })

        // 洗牌
        const doShuffle = (data: Poker[]) => {
            const array: Poker[] = data.concat()
            const timer = setTimeout(() => {
                const i = Math.floor(Math.random() * array.length)
                state.cardBox.push(array[i])
                const newArray = array.filter((item, index) => index !== i)
                if (newArray.length !== 0) {
                    doShuffle(newArray)
                } else {
                    state.showBtn = true
                    clearTimeout(timer)
                }
            }, 500)
        }

        // 发牌
        const doDeal = (data: Poker[]) => {
            const timer = setTimeout(() => {
                const i = Math.floor(Math.random() * data.length)

                if (state.dealIndex === 1) {
                    state.dealIndex++
                    state.player1.push(data[i])
                    state.player1.sort(formatData)
                } else if (state.dealIndex === 2) {
                    state.dealIndex++
                    state.player2.push(data[i])
                    state.player2.sort(formatData)
                } else if (state.dealIndex === 3) {
                    state.dealIndex = 1
                    state.player3.push(data[i])
                    state.player3.sort(formatData)
                }

                state.cardBox = data.filter((item, index) => index !== i)
                if (state.cardBox.length > 3) {
                    doDeal(state.cardBox)
                } else {
                    state.showBtn = true
                    clearTimeout(timer)
                }
            }, 500)
        }

        // 排序
        const formatData = (a: Poker, b: Poker) => {
            if (b.value === a.value) {
                return a.type - b.type
            } else {
                return b.value - a.value
            }
        }

        // 抢地主
        const setBoss = () => {
            state.showSetBoss = true

            let count: number = 0
            const timer = setInterval(() => {
                const i = Math.floor(Math.random() * 3 + 1)
                state.bossValue = i
                count++
                if (count == 100) {
                    clearInterval(timer)

                    if (i === 1) {
                        state.player1 = state.player1.concat(state.cardBox)
                        state.player1.sort(formatData)
                    }

                    if (i === 2) {
                        state.player2 = state.player2.concat(state.cardBox)
                        state.player2.sort(formatData)
                    }

                    if (i === 3) {
                        state.player3 = state.player3.concat(state.cardBox)
                        state.player3.sort(formatData)
                    }

                    state.cardBox = []

                    doStart() // 开始游戏
                }
            }, 50)
        }

        // 开始游戏
        const doStart = () => {
            state.gameState = true
            state.currentPlayer = state.bossValue
        }

        // 出牌
        const playAction = (item: Poker) => {}

        // 按钮
        const btnAction = (type: number) => {
            if (type === 1) { // 洗牌
                state.cardBox = []
                state.btnType = 2
                state.showBtn = false

                doShuffle(poker.concat())
            }

            if (type === 2) { // 发牌
                state.btnType = 3
                state.showBtn = false

                doDeal(state.cardBox)
            }

            if (type === 3) { // 抢地主
                state.btnType = 1
                state.showBtn = false

                setBoss()
            }
        }

        return {
            state,
            doShuffle,
            doDeal,
            formatData,
            playAction,
            btnAction,
        }
    }
})
</script>