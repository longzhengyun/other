<template>
    <play-btn v-if="state.showBtn" :data="state.btnType" @doAction="btnAction" />
    <card-box :data="state.cardBox" />
    <card-table v-if="state.gameState" :currentPlayer="state.currentPlayer" :previousPlayer="state.previousPlayer" :previousPoker="state.previousPoker" />
    <set-boss v-if="state.showSetBoss" :data="state.bossValue" />
    <player1 :data="state.player1" />
    <player2 :data="state.player2" :gameState="state.gameState" @doAction="playAction" />
    <player3 :data="state.player3" />
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';

import PokerData from './assets/data/poker.json'

import PlayBtn from './components/PlayBtn.vue'
import SetBoss from './components/SetBoss.vue'
import CardBox from './components/CardBox.vue'
import CardTable from './components/CardTable.vue'
import Player1 from './components/Player1.vue'
import Player2 from './components/Player2.vue'
import Player3 from './components/Player3.vue'

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
    previousPlayer: number,
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
        CardTable,
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
            previousPlayer: 0,
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
                let object: Poker = {
                    id: 0,
                    name: '',
                    value: 0,
                    type: 0,
                }

                if (state.previousPlayer === 1) {
                    object = state.player1[state.player1.length - 1]
                } else {
                    state.player1.forEach((item) => {
                        if (item.value > state.previousPoker.value) {
                            if (object.id !== 0) {
                                if (object.value > item.value) {
                                    object = item
                                }
                            } else {
                                object = item
                            }
                        }
                    })
                }

                if (object.id !== 0) {
                    setTimeout(() => {
                        state.player1 = state.player1.filter((value: Poker) => {
                            return value.id !== object.id
                        })
                        state.cardBox.push(object)

                        if (state.player1.length === 0) {
                            doEnd(1)
                            return false
                        }

                        state.previousPlayer = 1
                        state.previousPoker = object
                        state.currentPlayer = 2
                    }, 1000);
                } else {
                    setTimeout(() => {
                        state.currentPlayer = 2
                    }, 1000);
                }
            }

            if (currentPlayer === 3) { // Player 3
                let object: Poker = {
                    id: 0,
                    name: '',
                    value: 0,
                    type: 0,
                }

                if (state.previousPlayer === 3) {
                    object = state.player3[state.player3.length - 1]
                } else {
                    state.player3.forEach((item) => {
                        if (item.value > state.previousPoker.value) {
                            if (object.id !== 0) {
                                if (object.value > item.value) {
                                    object = item
                                }
                            } else {
                                object = item
                            }
                        }
                    })
                }

                if (object.id !== 0) {
                    setTimeout(() => {
                        state.player3 = state.player3.filter((value: Poker) => {
                            return value.id !== object.id
                        })
                        state.cardBox.push(object)

                        if (state.player3.length === 0) {
                            doEnd(3)
                            return false
                        }

                        state.previousPlayer = 3
                        state.previousPoker = object
                        state.currentPlayer = 1
                    }, 1000);
                } else {
                    setTimeout(() => {
                        state.currentPlayer = 1
                    }, 1000);
                }
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
            }, 100)
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
                    state.dealIndex = 1
                    clearTimeout(timer)
                }
            }, 100)
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
            }, 10)
        }

        // 开始游戏
        const doStart = () => {
            state.gameState = true
            state.currentPlayer = state.bossValue
        }

        // 结束游戏
        const doEnd = (player: number) => {
            state.showBtn = true
            state.bossValue = 0
            state.cardBox = []
            state.showSetBoss = false
            state.currentPlayer = 0,
            state.previousPlayer = 0,
            state.previousPoker = {
                id: 0,
                name: '',
                value: 0,
                type: 0,
            },
            state.gameState = false,
            state.player1 = []
            state.player2 = []
            state.player3 = []

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
        const playAction = (item: Poker) => {
            if (state.previousPoker.value === 0 || state.previousPlayer === 2) {
                if (item) {
                    state.player2 = state.player2.filter((value: Poker) => {
                        return value.id !== item.id
                    })
                    state.cardBox.push(item)

                    if (state.player2.length === 0) {
                        doEnd(2)
                        return false
                    }

                    state.previousPlayer = 2
                    state.previousPoker = item
                    state.currentPlayer = 3
                } else {
                    return false
                }
            } else {
                if (item) {
                    if (item.value > state.previousPoker.value) {
                        state.player2 = state.player2.filter((value: Poker) => {
                            return value.id !== item.id
                        })

                        if (state.player2.length === 0) {
                            doEnd(2)
                            return false
                        }

                        state.cardBox.push(item)
                        state.previousPlayer = 2
                        state.previousPoker = item
                        state.currentPlayer = 3
                    }
                } else {
                    state.currentPlayer = 3
                }
            }
        }

        // 按钮
        const btnAction = (type: number) => {
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