import { Poker, Cards } from './../@types'

// 每张牌个数
const getCardsCount = (data: Poker[]) => {
    return data.reduce((prev: any, next: Poker) => {
        prev[next.value] = (prev[next.value] + 1) || 1
        return prev
    }, {})
}

// 连续牌分组
const getCardsGroup = (data: Cards[]) => {
    let result: Cards[] = []
    let array: Array<Cards[]> = []
    let i = 0

    data.sort((a, b) => { // 从小到大排序
        return a.value - b.value
    })

    array[i] = [data[0]]

    data.reduce((prev: Cards, cur: Cards) => {
        if (cur.value - prev.value === 1) {
            if (cur.value !== 15) { // 排除2
                array[i].push(cur)
            }
        } else {
            array[++i] = [cur]
        }
        return cur
    })

    array.forEach((item1) => {
        const object: Cards = {
            type: 0,
            value: 0,
            length: 0,
            data: []
        }

        item1.forEach((item2) => {
            object.type = item2.type
            object.value = item2.value
            object.length = item2.length
            object.data = object.data.concat(item2.data)
        })

        result.push(object)
    })

    return result
}

// 过滤数组数据
const filterArray = (data1: Poker[], data2: Cards[]) => {
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

// 过滤对象数据
const filterObject = (data1: Poker[], data2: Cards) => {
    return data1.filter((item1: Poker) => {
        let result = true
        data2.data.forEach((item2) => {
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

    if (type === 13) {
        if (cardsCount[16] === 1 && cardsCount[17] === 1) { // 王炸
            const array: Poker[] = []
            data.forEach((item) => {
                if (item.value === 16 || item.value === 17) {
                    array.push(item)
                }
            })

            result.push({
                type,
                value: 999,
                length: 0,
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
                    length: 1,
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
const getRow = (data: Poker[], type: Number): Cards => {
    let result: Cards = {
        type: 0,
        value: 0,
        length: 0,
        data: []
    }

    const cardsCount = getCardsCount(data)
    let count = 0
    let snapArray: Cards[] = []
    switch (type) {
        case 5:
            count = 1
            break
        case 6:
            count = 2
            break
        case 7:
            count = 3
            break
    }

    for (const key in cardsCount) {
        if (cardsCount[key] >= count) {
            const array: Poker[] = []
            let number = 0
            data.forEach((item) => {
                if (item.value === Number(key) && number < count) {
                    array.push(item)
                    number++
                }
            })

            snapArray.push({
                type,
                value: Number(key),
                length: array.length / count,
                data: array
            })
        }
    }

    if (snapArray.length > 0) {
        const groupArray = getCardsGroup(snapArray)

        if (type === 5) {
            for (let i = 0; i < groupArray.length; i++) {
                if (groupArray[i].data.length >= 5) {
                    result = groupArray[i]
                    break
                }
            }
        }

        if (type === 6 || type === 7) {
            for (let i = 0; i < groupArray.length; i++) {
                if (groupArray[i].data.length >= 6) {
                    result = groupArray[i]
                    break
                }
            }
        }
    }

    return result
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
        if (data[item] === type) { // 三顺或者四顺
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

        if ((type === 3 && Object.keys(data).length === 2) || (type === 4 && Object.keys(data).length === 3)) {
            if (isSingle) { // 三顺带单 炸弹带单
                result = 1
            }

            if (isDouble) { // 三顺单双 炸弹带双
                result = 2
            }
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

    const four = getAlone(data, 4) // 四张

    const threeRowData = filterArray(data, four)
    const threeRow = getRow(threeRowData, 7) // 三顺

    const doubleRowData = filterObject(threeRowData, threeRow)
    const doubleRow = getRow(doubleRowData, 6) // 双顺

    const singleRowData = filterObject(doubleRowData, doubleRow)
    const singleRow = getRow(singleRowData, 5) // 单顺

    const threeData = filterObject(singleRowData, singleRow)
    const three = getAlone(threeData, 3) // 三张

    const doubleData = filterArray(threeData, three)
    const double = getAlone(doubleData, 2) // 两张

    const boomData = filterArray(doubleData, double)
    const boom = getAlone(boomData, 13) // 王炸

    const singleData = filterArray(boomData, boom)
    const single = getAlone(singleData, 1) // 单张

    if (state) {
        if (singleRow.type !== 0) {
            result = singleRow.data
        } else if (doubleRow.type !== 0) {
            result = doubleRow.data
        } else if (threeRow.type !== 0) {
            const firstData = threeRow
            const length = firstData.data.length / 3

            result = threeRow.data
            if (single.length >= length) {
                single.forEach((item, index) => {
                    if (index < length) {
                        result = result.concat(item.data)
                    }
                })
            } else if (double.length >= length) {
                double.forEach((item, index) => {
                    if (index < length) {
                        result = result.concat(item.data)
                    }
                })
            }
        } else if (three.length > 0) {
            result = three[0].data

            if (single.length > 0) {
                result = result.concat(single[0].data)
            } else if (double.length > 0) {
                result = result.concat(double[0].data)
            }
        } else if (double.length > 0) {
            result = double[0].data
        } else if (single.length > 0) {
            result = single[0].data
        } else if (four.length > 0) {
            result = four[0].data
        } else if (boom.length > 0) {
            result = boom[0].data
        }
    } else {
        let array: Poker[] = []
        if (previousCards.type === 1) {
            for (let i = 0; i < single.length; i++) { // 出单张
                if (single[i].value > previousCards.value) {
                    array = single[i].data
                    break
                }
            }

            if (array.length === 0) {
                for (let i = 0; i < double.length; i++) {
                    if (double[i].value > previousCards.value && double[i].value === 15) { // 两张中拆2
                        array.push(double[i].data[0])
                        break
                    }
                }
            }

            if (array.length === 0) {
                for (let i = 0; i < three.length; i++) {
                    if (three[i].value > previousCards.value && three[i].value === 15) { // 三张中拆2
                        array.push(three[i].data[0])
                        break
                    }
                }
            }
        }

        if (previousCards.type === 2) {
            for (let i = 0; i < double.length; i++) { // 出两张
                if (double[i].value > previousCards.value) {
                    array = double[i].data
                    break
                }
            }

            if (array.length === 0) {
                for (let i = 0; i < three.length; i++) {
                    if (three[i].value > previousCards.value && three[i].value === 15) { // 三张中拆2
                        array.push(three[i].data[0])
                        array.push(three[i].data[1])
                        break
                    }
                }
            }
        }

        if (previousCards.type === 3) {
            for (let i = 0; i < three.length; i++) { // 出三张
                if (three[i].value > previousCards.value) {
                    array = three[i].data
                    break
                }
            }
        }

        // if (previousCards.type === 4) {}

        if (previousCards.type === 5) { // 出单顺
            if (singleRow.value > previousCards.value && singleRow.length >= previousCards.length) {
                array = singleRow.data.slice(0, Number(previousCards.length) - 1)
            }
        }

        if (previousCards.type === 6) { // 出双顺
            if (doubleRow.value > previousCards.value && doubleRow.length === previousCards.length) {
                array = doubleRow.data.slice(0, Number(previousCards.length) * 2 - 1)
            }
        }

        if (previousCards.type === 7) { // 出三顺
            if (threeRow.value > previousCards.value && threeRow.length === previousCards.length) {
                array = threeRow.data.slice(0, Number(previousCards.length) * 3 - 1)
            }
        }

        if (previousCards.type === 8) { // 出三顺带单
            if (previousCards.length === 4) {
                for (let i = 0; i < three.length; i++) { // 出三张
                    if (three[i].value > previousCards.value && single.length > 0) {
                        array = array.concat(three[i].data)
                        array = array.concat(single[0].data)
                        break
                    }
                }
            } else {
                if (threeRow.value > previousCards.value && threeRow.length >= previousCards.length && single.length >= previousCards.length) {
                    array = array.concat(threeRow.data.slice(0, Number(previousCards.length) * 3 - 1))
                    for (let i = 0; i < previousCards.length; i++) {
                        array = array.concat(single[i].data)
                    }
                }
            }
        }

        if (previousCards.type === 9) { // 出三顺带双
            if (threeRow.value > previousCards.value && threeRow.length >= previousCards.length && double.length >= previousCards.length) {
                array = array.concat(threeRow.data.slice(0, Number(previousCards.length) * 3 - 1))
                for (let i = 0; i < previousCards.length; i++) {
                    array = array.concat(double[i].data)
                }
            }
        }

        // if (previousCards.type === 10) {}

        // if (previousCards.type === 11) {}

        // if (previousCards.type === 12) {}

        // if (previousCards.type === 13) {}

        if (array.length === 0 && previousCards.type !== 13) {
            if (previousCards.type === 4) { // 出四张
                for (let i = 0; i < four.length; i++) {
                    if (four[i].value > previousCards.value) {
                        array = four[i].data
                        break
                    }
                }
            } else {
                if (four.length > 0) { // 炸弹
                    array = four[0].data
                }
            }
        }

        if (array.length === 0) {
            if (boom.length > 0) { // 王炸
                array = boom[0].data
            }
        }

        result = array
    }

    return result
}

// 按张数分类：1 单张 2 两张 王炸 3 三张 4 四张 三顺带单 5+ 单顺 双顺 三顺 三顺带单 三顺带双 四顺 四顺带单 四顺带双
// 牌型规则： 1 单张 2 两张 3 三张 4 四张 5 单顺 6 双顺 7 三顺 8 三顺带单 9 三顺带双 10 四顺 11 四顺带单 12 四顺带双 13 王炸
export const getCardsInfo = (selectCards: Poker[]): Cards => {
    let type: Number = 0
    let value: Number = 0
    let length: Number = 0
    const data = selectCards.concat().sort(formatData)

    if (data.length > 0) {
        const cardsCount = getCardsCount(data)
        const first = data[0].value

        if (data.length === 1) { // 单张
            type = 1
            value = first
            length = 1
        }

        if (data.length === 2) { // 两张 王炸
            if (cardsCount[first] === 2) { // 两张
                type = 2
                value = first
                length = 1
            }

            if (cardsCount[16] === 1 && cardsCount[17] === 1) { // 王炸
                type = 13
                length = 1
            }
        }

        if (data.length === 3) { // 三张
            if (cardsCount[first] === 3) {
                type = 3
                value = first
                length = 1
            }
        }

        if (data.length === 4) { // 四张 三顺带单
            if (cardsCount[first] === 4) { // 四张
                type = 4
                value = first
                length = 1
            } else { // 三顺带单
                let threeRowMore = isRowMore(cardsCount, 3)
                if (threeRowMore === 1) {
                    type = 8
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
                length = 1
            }
        }

        if (data.length >= 5) { // 单顺 双顺 三顺 三顺带单 三顺带双 四顺 四顺带单 四顺带双
            // 单顺
            let singleRow = isRow(cardsCount, 1)
            if (singleRow) {
                type = 5
                value = data[0].value
                length = data.length
            }

            // 双顺
            let doubleRow = isRow(cardsCount, 2)
            if (doubleRow) {
                type = 6
                value = data[0].value
                length = data.length / 2
            }

            // 三顺
            let threeRow = isRow(cardsCount, 3)
            if (threeRow) {
                type = 7
                value = data[0].value
                length = data.length / 3
            }

            // 三顺带单 三顺带双
            let threeRowMore = isRowMore(cardsCount, 3)
            if (threeRowMore === 1 || threeRowMore === 2) {
                if (threeRowMore === 1) {
                    type = 8
                    length = data.length / 4
                }

                if (threeRowMore === 2) {
                    type = 9
                    length = data.length / 5
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
                type = 10
                value = data[0].value
                length = data.length / 4
            }

            // 四带单 四带双
            let fourRowMore = isRowMore(cardsCount, 4)
            if (fourRowMore === 1 || fourRowMore === 2) {
                if (fourRowMore === 1) {
                    type = 11
                    length = data.length / 5
                }

                if (fourRowMore === 2) {
                    type = 12
                    length = data.length / 6
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

    return { type, value, length, data }
}