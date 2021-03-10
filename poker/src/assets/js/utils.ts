import { Poker } from './../@types';

// 排序
export const formatData = (a: Poker, b: Poker) => {
    if (b.value === a.value) {
        return a.type - b.type
    } else {
        return b.value - a.value
    }
}

// 选牌
export const getSelectCards = (item: Poker, selectCards: Poker[]) => {
    let result = selectCards.concat()
    if (result.includes(item)) {
        result = result.filter((value: Poker) => {
            return value.id !== item.id
        })
    } else {
        result.push(item)
    }

    return result
}

// 出牌
export const doPlayCards = (data: Poker[], previousCards: Poker[], state: Boolean) => {
    const result: Poker[] = []

    if (state) {
    }

    return result
}