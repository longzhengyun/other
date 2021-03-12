import { Poker, Cards } from './../@types'

// 每张牌个数
const getCardsCount = (data: Poker[]) => {
    return data.reduce((prev: any, next: Poker) => {
        prev[next.value] = (prev[next.value] + 1) || 1
        return prev
    }, {})
}

// 数据过滤
const filterData = (data1: Poker[], data2: Cards[]) => {
    return data1.filter((item1: Poker) => {
        let result = true
        data2.forEach((item2) => {
            if (item2.value === item1.value) {
                result = false
            }
        })
        return result
    })
}

// 获取 单张 两张 三张 四张
const getAlone = (data: Poker[], type: Number): Cards[] => {
    const result: Cards[] = []

    const cardsCount = getCardsCount(data)

    if (type === 11) {
        if (cardsCount[16] === 1 && cardsCount[17] === 1) { // 王炸
            const array: Poker[] = []
            data.forEach((item) => {
                if (item.value === 16 || item.value === 17) {
                    array.push(item)
                }
            })

            result.push({
                type,
                value: 0,
                data: array
            })
        }
    } else {
        for (const key in cardsCount) {
            if (cardsCount[key] === type) {
                const array: Poker[] = []
                data.forEach((item) => {
                    if (item.value === Number(key)) {
                        array.push(item)
                    }
                })

                result.push({
                    type,
                    value: Number(key),
                    data: array
                })
            }
        }
    }

    return result.sort((a, b) => { // 从小到大排序
        return a.value - b.value
    })
}

// 获取 单顺 双顺 三顺
const getRow = (data: Poker[], type: Number): Cards[] => {
    const result: Cards[] = []

    const cardsCount = getCardsCount(data)
    const array = Object.keys(cardsCount).sort((a: String, b: String) => { // 从小到大排序
        return Number(a) - Number(b)
    })

    if (type === 1) { }

    if (type === 2) { }

    if (type === 3) { }

    return result.sort((a, b) => { // 从小到大排序
        return a.value - b.value
    })
}

// 判断 单顺 双顺 三顺 四顺
const isRow = (data: any, type: Number): Boolean => {
    let result = true

    const array = Object.keys(data).sort((a: String, b: String) => { // 从小到大排序
        return Number(a) - Number(b)
    })

    let total1 = 0
    array.forEach((item, index) => { // 按累加一求和
        total1 = total1 + (Number(array[0]) + index)
    })

    let total2 = 0
    array.forEach((item) => { // 直接求和
        total2 = total2 + Number(item)
    })

    if (total1 !== total2) {
        result = false
    }

    for (const item in data) {
        if (Number(item) === 15 && array.length > 1) { // 排除2
            result = false
        }

        if (Number(item) === 16 || Number(item) === 17) { // 大小鬼
            result = false
        }

        if (data[item] !== type) {
            result = false
        }
    }

    if (type === 1 && array.length < 5) { // 单顺个数大于等于5
        result = false
    }

    if (type === 2 && array.length < 3) { // 双顺个数大于等于3
        result = false
    }

    if (type === 3 && array.length < 2) { // 三顺个数大于等于2
        result = false
    }

    return result
}

// 判断 三顺带单 三顺带双 四顺带单 四顺带双
const isRowMore = (data: any, type: Number): Number => {
    let result = 0

    const object1: any = {}
    const object2: any = {}
    for (const item in data) {
        if (data[item] === type) { // 三顺或者炸弹
            object1[item] = data[item]
        } else { // 其他
            object2[item] = data[item]
        }
    }

    const array = Object.keys(object1).sort((a: String, b: String) => { // 从小到大排序
        return Number(a) - Number(b)
    })

    let total1 = 0
    array.forEach((item, index) => { // 按累加一求和
        total1 = total1 + (Number(array[0]) + index)
    })

    let total2 = 0
    array.forEach((item) => { // 直接求和
        total2 = total2 + Number(item)
    })

    if (total1 !== 0 && total2 !== 0 && total1 === total2) {
        let isSingle = true
        let isDouble = true
        for (const item in object2) {
            if (object2[item] !== 1) { // 有不是单张的
                isSingle = false
            }

            if (object2[item] !== 2) { // 有不是对子的
                isDouble = false
            }
        }

        if (isSingle) { // 三顺带单 炸弹带单
            result = 1
        }

        if (isDouble) { // 三顺单双 炸弹带双
            result = 2
        }
    }

    for (const item in object1) {
        if (Number(item) === 15 && array.length > 1) { // 排除2
            result = 0
        }
    }

    return result
}

// 排序
export const formatData = (a: Poker, b: Poker) => {
    if (b.value === a.value) {
        return a.type - b.type
    } else {
        return b.value - a.value
    }
}

// 选牌
export const changeSelectCards = (item: Poker, selectCards: Poker[]): Poker[] => {
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

// 定牌规则 保留优先级 王炸>四张>三顺>双顺>单顺>三张>两张>单张
export const doConfirmCards = (data: Poker[], previousCards: Cards, state: Boolean): Poker[] => {
    let result: Poker[] = []

    const four = getAlone(data, 8) // 四张

    const threeRowData = filterData(data, four)
    const threeRow = getRow(threeRowData, 5) // 三顺

    const doubleRowData = filterData(threeRowData, threeRow)
    const doubleRow = getRow(doubleRowData, 4) // 双顺

    const singleRowData = filterData(doubleRowData, doubleRow)
    const singleRow = getRow(singleRowData, 3) // 单顺

    const threeData = filterData(singleRowData, singleRow)
    const three = getAlone(threeData, 5) // 三张

    const doubleData = filterData(threeData, three)
    const double = getAlone(doubleData, 2) // 两张

    const singleData = filterData(doubleData, double)
    const single = getAlone(singleData, 1) // 单张

    const boomData = filterData(singleData, single)
    const boom = getAlone(boomData, 11) // 王炸

    if (state) {
        if (single.length > 0) {
            result = single[0].data
        } else if (double.length > 0) {
            result = double[0].data
        } else if (three.length > 0) {
            result = three[0].data
        } else if (singleRow.length > 0) {
            result = singleRow[0].data
        } else if (doubleRow.length > 0) {
            result = doubleRow[0].data
        } else if (threeRow.length > 0) {
            result = threeRow[0].data
        } else if (four.length > 0) {
            result = four[0].data
        } else if (boom.length > 0) {
            result = boom[0].data
        }
    }

    return result
}

// 按张数分类：1 单张 2 两张 王炸 3+ 单顺 双顺 三顺 三顺带单 三顺带双 四顺 四顺带单 四顺带双
// 牌型规则： 1 单张 2 两张 3 单顺 4 双顺 5 三顺 6 三顺带单 7 三顺带双 8 四顺 9 四顺带单 10 四顺带双 11 王炸
export const getCardsInfo = (selectCards: Poker[]): Cards => {
    let type: Number = 0
    let value: Number = 0
    const data = selectCards.concat().sort(formatData)

    if (data.length > 0) {
        const cardsCount = getCardsCount(data)
        const first = data[0].value

        // 单张
        if (data.length === 1) {
            type = 1
            value = first
        }

        // 两张 王炸
        if (data.length === 2) {
            if (cardsCount[first] === 2) { // 两张
                type = 2
                value = first
            }

            if (cardsCount[16] === 1 && cardsCount[17] === 1) { // 王炸
                type = 11
            }
        }

        // 单顺 双顺 三顺 三顺带单 三顺带双 四顺 四顺带单 四顺带双
        if (data.length >= 3) {
            // 单顺
            let singleRow = isRow(cardsCount, 1)
            if (singleRow) {
                type = 3
                value = data[0].value
            }

            // 双顺
            let doubleRow = isRow(cardsCount, 2)
            if (doubleRow) {
                type = 4
                value = data[0].value
            }

            // 三顺
            let threeRow = isRow(cardsCount, 3)
            if (threeRow) {
                type = 5
                value = data[0].value
            }

            // 三顺带单 三顺带双
            let threeRowMore = isRowMore(cardsCount, 3)
            if (threeRowMore === 1 || threeRowMore === 2) {
                if (threeRowMore === 1) {
                    type = 6
                }

                if (threeRowMore === 2) {
                    type = 7
                }

                let result = 0
                for (const key in cardsCount) {
                    if (cardsCount[key] === 3) {
                        if (Number(key) > result) {
                            result = Number(key)
                        }
                    }
                }

                value = result
            }

            // 四顺
            let fourRow = isRow(cardsCount, 4)
            if (fourRow) {
                type = 8
                value = data[0].value
            }

            // 四带单 四带双
            let fourRowMore = isRowMore(cardsCount, 4)
            if (fourRowMore === 1 || fourRowMore === 2) {
                if (fourRowMore === 1) {
                    type = 9
                }

                if (fourRowMore === 2) {
                    type = 10
                }

                let result = 0
                for (const key in cardsCount) {
                    if (cardsCount[key] === 4) {
                        if (Number(key) > result) {
                            result = Number(key)
                        }
                    }
                }

                value = result
            }
        }
    }

    return { type, value, data }
}