<template>
  <div class="select-wrap">
    <ul class="select-option">
      <li class="option-item" :class="{ 'cur': optionIndex === key }" v-for="(item, key) in optionData" :key="key" @click="changeOption(item, key)">{{item}}</li>
    </ul>
    <ul class="select-value">
      <li class="value-item" v-for="(item, key) in valueData" :key="key" @click="goTarget(item.id, item.point)">{{item.tradeArea}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SelectComponent',
    props: ['data'],
    data () {
      return {
        optionData: [],
        optionIndex: 0,
        valueData: []
      }
    },
    mounted () {
      this.initData() // 初始化数据
    },
    methods: {
      initData () {
        this.data.map((value1) => {
          let isPass = true
          this.optionData.map((value2) => {
            if (value1.area === value2) {
              isPass = false
            }
          })
          if (isPass) {
            this.optionData.push(value1.area)
          }
        })
        this.data.map((value) => {
          if (value.area === this.optionData[0]) {
            this.valueData.push(value)
          }
        })
      },
      changeOption (area, key) {
        this.optionIndex = key
        this.valueData = []
        this.data.map((value) => {
          if (value.area === area) {
            this.valueData.push(value)
          }
        })
      },
      goTarget (id, point) {
        point = {
          x: point.x,
          y: point.y
        }
        this.$emit('goTarget', id, point)
      }
    }
  }
</script>

<style scoped>
.select-wrap{border:1px solid #fff;border-radius:.125rem;background-color:rgba(0, 0, 0, .6);color:#fff;font-size:0;white-space:nowrap;text-align:center;overflow:hidden;}
.select-wrap .select-option{display:inline-block;width:2.35rem;height:calc(100% - .4rem);margin:.2rem 0;border-right:1px solid rgba(255, 255, 255, .1);vertical-align:top;overflow-x:hidden;}
.select-wrap .select-option .option-item{line-height:.8rem;font-size:.36rem;}
.select-wrap .select-option .option-item.cur{color:#fff100;font-size:.42rem;font-weight:bold;background-color:rgba(255, 255, 255, .1)}
.select-wrap .select-value{display:inline-block;width:4.3rem;height:calc(100% - .4rem);margin:.2rem 0;vertical-align:top;overflow-x:hidden;}
.select-wrap .select-value .value-item{line-height:.8rem;font-size:.36rem;}
</style>
