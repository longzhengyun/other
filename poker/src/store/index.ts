import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, createLogger } from 'vuex'

import { Poker, StoreState } from './../assets/@types';

const state = {
    bossPlayer: 0,
    currentPlayer: 0,
    previousPlayer: 0,
    previousCards: [],
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
    previousCards(state: StoreState, data: Poker[]) {
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