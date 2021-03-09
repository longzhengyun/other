export interface Poker {
    id: Number,
    name: String,
    value: Bigint,
    type: Bigint,
}

export interface StoreState {
    bossPlayer: Number,
    currentPlayer: Number,
    previousPlayer: Number,
    previousCards: Poker[],
    selectCards: Poker[],
}

export interface MainState {
    btnType: Number,
    showBtn: Boolean,
    dealIndex: BigInt,
    cardBox: Poker[],
    bossCard: Poker[],
    showBossCard: Boolean,
    gameState: Boolean,
    player1: Poker[],
    player2: Poker[],
    player3: Poker[],
}