import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, createLogger } from 'vuex'

import { Poker, Cards, StoreState } from './../assets/@types'

const state = {
    bossPlayer: 0,
    currentPlayer: 0,
    previousPlayer: 0,
    previousCards: {
        type: 0, // 1 单张 2 两张 3 单顺 4 双顺 5 三顺 6 三顺带单 7 三顺带双 8 四顺 9 四顺带单 10 四顺带双 11 王炸
        value: 0,
        data: []
    },
    selectCards: [],
}

const mutations = {
    bossPlayer(state: StoreState, data: Number) {
        state.bossPlayer = data
    },
    currentPlayer(state: StoreState, data: Number) {
        state.currentPlayer = data
    },
    previousPlayer(state: StoreState, data: Number) {
        state.previousPlayer = data
    },
    previousCards(state: StoreState, data: Cards) {
        state.previousCards = data
    },
    selectCards(state: StoreState, data: Poker[]) {
        state.selectCards = data
    },
}

const actions = {}

export const key: InjectionKey<Store<StoreState>> = Symbol()

export const store = createStore<StoreState>({
    state,
    mutations,
    actions,
    plugins: [createLogger()],
})

export const useStore = () => {
    return baseUseStore(key)
}