<template>
    <card-table>
        <template v-slot:playBtn>
            <play-btn v-if="state.showBtn" :data="state.btnType" @doAction="btnAction" />
        </template>
        <template v-slot:cardBox>
            <card-box :data="state.cardBox" />
        </template>
        <template v-slot:bossCard>
            <boss-card :data="state.bossCard" :show="state.showBossCard" />
        </template>
        <template v-slot:player1>
            <player1 :data="state.player1" />
        </template>
        <template v-slot:player2>
            <player2 :data="state.player2" :gameState="state.gameState" @doAction="playAction" />
        </template>
        <template v-slot:player3>
            <player3 :data="state.player3" />
        </template>
    </card-table>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, computed } from 'vue'
import { useStore } from './store'

import PokerData from './assets/data/poker.json'
import { formatData, changeSelectCards, doConfirmCards, getCardsInfo } from './assets/js/utils'
import { Poker, Cards, MainState } from './assets/@types'

import PlayBtn from './components/PlayBtn.vue'
import BossCard from './components/BossCard.vue'
import CardBox from './components/CardBox.vue'
import CardTable from './components/CardTable.vue'
import Player1 from './components/Player1.vue'
import Player2 from './components/Player2.vue'
import Player3 from './components/Player3.vue'

export default defineComponent({
    name: 'Index',
    components: {
        PlayBtn,
        BossCard,
        CardBox,
        CardTable,
        Player1,
        Player2,
        Player3,
    },
    setup() {
        const state: MainState = reactive({
            btnType: 1,
            showBtn: true,
            dealIndex: 1,
            cardBox: [],
            bossCard: [],
            showBossCard: false,
            gameState: false,
            player1: [],
            player2: [],
            player3: [],
        })

        const store = useStore()

        // 地主
        const bossPlayer = computed(() : Number => store.state.bossPlayer)

        // 当前玩家
        const currentPlayer = computed(() : Number => store.state.currentPlayer)

        // 上一次出牌玩家
        const previousPlayer = computed(() : Number => store.state.previousPlayer)

        // 上一次出牌
        const previousCards = computed(() : Cards => store.state.previousCards)

        // 选择的牌
        const selectCards = computed(() : Poker[] => store.state.selectCards)

        // 监听当前玩家
        watch(currentPlayer, (player: Number) => {
            if (player === 1) { // Player 1
            let playerState = previousPlayer.value === 0 || previousPlayer.value === 1
                const confirmCards = doConfirmCards(state.player1, previousCards.value, playerState)

                const i = Math.floor(Math.random() * 10) // 添加10%不出率
                const cardsInfo = getCardsInfo(i >= 1 ? confirmCards : [])

                if (cardsInfo.type !== 0) {
                    setTimeout(() => {
                        state.player1 = state.player1.filter((value: Poker) => {
                            return !cardsInfo.data.includes(value)
                        })
                        state.cardBox.concat(cardsInfo.data)

                        if (state.player1.length === 0) {
                            doEnd(1)
                            return false
                        }

                        store.commit('previousCards', cardsInfo)
                        store.commit('previousPlayer', 1)
                        store.commit('currentPlayer', 2)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        store.commit('currentPlayer', 2)
                        alert('要不起')
                    }, 1000)
                }
            }

            if (player === 3) { // Player 3
            let playerState = previousPlayer.value === 0 || previousPlayer.value === 3
                const confirmCards = doConfirmCards(state.player3, previousCards.value, playerState)

                const i = Math.floor(Math.random() * 10) // 添加10%不出率
                const cardsInfo = getCardsInfo(i >= 1 ? confirmCards : [])

                if (cardsInfo.type !== 0) {
                    setTimeout(() => {
                        state.player3 = state.player3.filter((value: Poker) => {
                            return !cardsInfo.data.includes(value)
                        })
                        state.cardBox.concat(cardsInfo.data)

                        if (state.player3.length === 0) {
                            doEnd(3)
                            return false
                        }

                        store.commit('previousCards', cardsInfo)
                        store.commit('previousPlayer', 3)
                        store.commit('currentPlayer', 1)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        store.commit('currentPlayer', 1)
                        alert('要不起')
                    }, 1000)
                }
            }
        })

        // 洗牌
        const doShuffle = (data: Poker[]) => {
            const array: Poker[] = data.concat()
            const timer = setTimeout(() => {
                const i = Math.floor(Math.random() * array.length)
                state.cardBox.push(array[i])
                const newArray = array.filter((item, index: Number) => index !== i)
                if (newArray.length !== 0) {
                    doShuffle(newArray)
                } else {
                    state.showBtn = true
                    clearTimeout(timer)
                }
            }, 100)
        }

        // 发牌
        const doDeal = (data: Poker[]) => {
            const timer = setTimeout(() => {
                if (state.dealIndex === 1) {
                    state.dealIndex++
                    state.player1.push(data[0])
                    state.player1.sort(formatData)
                } else if (state.dealIndex === 2) {
                    state.dealIndex++
                    state.player2.push(data[0])
                    state.player2.sort(formatData)
                } else if (state.dealIndex === 3) {
                    state.dealIndex = 1
                    state.player3.push(data[0])
                    state.player3.sort(formatData)
                }

                state.cardBox = data.filter((item, index) => index !== 0)
                if (state.cardBox.length > 3) {
                    doDeal(state.cardBox)
                } else {
                    state.bossCard = state.cardBox.concat()
                    state.cardBox = []

                    if (bossPlayer.value !== 0) {
                        state.btnType = 1
                        getBossCards(bossPlayer.value)
                    } else {
                        state.showBtn = true
                    }

                    state.dealIndex = 1
                    clearTimeout(timer)
                }
            }, 100)
        }

        // 拿底牌
        const getBossCards = (player: Number) => {
            if (player === 1) {
                state.player1 = state.player1.concat(state.bossCard)
                state.player1.sort(formatData)
            }

            if (player === 2) {
                state.player2 = state.player2.concat(state.bossCard)
                state.player2.sort(formatData)
            }

            if (player === 3) {
                state.player3 = state.player3.concat(state.bossCard)
                state.player3.sort(formatData)
            }

            doStart() // 开始游戏
        }

        // 抢地主
        const getBoss = () => {
            let count = 0
            const timer = setInterval(() => {
                const i = Math.floor(Math.random() * 3 + 1)
                store.commit('bossPlayer', i)
                count++
                if (count == 50) {
                    clearInterval(timer)
                    getBossCards(i)
                }
            }, 50)
        }

        // 开始游戏
        const doStart = () => {
            state.gameState = true
            state.showBossCard = true
            store.commit('currentPlayer', bossPlayer.value)
        }

        // 结束游戏
        const doEnd = (player: Number) => {
            state.showBtn = true
            state.cardBox = []
            state.bossCard = []
            state.showBossCard = false
            state.gameState = false
            state.player1 = []
            state.player2 = []
            state.player3 = []

            store.commit('bossPlayer', player)
            store.commit('currentPlayer', 0)
            store.commit('previousPlayer', 0)
            store.commit('previousCards', {
                type: 0,
                value: 0,
                data: []
            })
            store.commit('selectCards', [])

            let winText = ''
            if (player === 1) {
                winText = 'Player 1 获胜'
            }

            if (player === 2) {
                winText = '恭喜您获胜了！'
            }

            if (player === 3) {
                winText = 'Player 3 获胜'
            }
            alert(winText)
        }

        // 出牌
        const playAction = (type: String, data: Poker) => {
            if (type === 'Select') {
                const select = changeSelectCards(data, selectCards.value)
                store.commit('selectCards', select)
            }

            if (type === 'Play' && selectCards.value.length !== 0) {
                const cardsInfo = getCardsInfo(selectCards.value)

                if (cardsInfo.type !== 0) {
                    setTimeout(() => {
                        state.player2 = state.player2.filter((value: Poker) => {
                            return !cardsInfo.data.includes(value)
                        })
                        state.cardBox.concat(cardsInfo.data)

                        if (state.player2.length === 0) {
                            doEnd(2)
                            return false
                        }

                        store.commit('selectCards', [])
                        store.commit('previousCards', cardsInfo)
                        store.commit('previousPlayer', 2)
                        store.commit('currentPlayer', 3)
                    }, 1000)
                }
            }

            if (type === 'Prompt') {
                let playerState = previousPlayer.value === 0 || previousPlayer.value === 2
                const confirmCards = doConfirmCards(state.player2, previousCards.value, playerState)
                store.commit('selectCards', confirmCards)
            }

            if (type === 'Pass') {
                store.commit('currentPlayer', 3)
            }
        }

        // 按钮
        const btnAction = (type: Number) => {
            if (type === 1) { // 洗牌
                state.btnType = 2
                state.showBtn = false

                doShuffle(PokerData.concat())
            }

            if (type === 2) { // 发牌
                state.btnType = 3
                state.showBtn = false

                doDeal(state.cardBox)
            }

            if (type === 3) { // 抢地主
                state.btnType = 1
                state.showBtn = false

                getBoss()
            }
        }

        return {
            state,
            playAction,
            btnAction,
        }
    }
})
</script>