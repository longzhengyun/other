export interface Poker {
    id: Number,
    name: String,
    value: Bigint,
    type: Bigint,
}

export interface Cards {
    type: Number,
    value: Bigint,
    length: Number,
    data: Poker[],
}

export interface StoreState {
    bossPlayer: Number,
    currentPlayer: Number,
    previousPlayer: Number,
    previousCards: Cards,
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
    winner: Number,
}