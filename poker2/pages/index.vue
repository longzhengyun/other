<template>
  <section class="container">
    <game-title :data="state.title" />
    <game-option
      :data="state.option"
      :target="state.target"
      @doAction="selectGame"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, useRouter } from '@nuxtjs/composition-api'

import GameTitle from '@/components/home/GameTitle.vue'
import GameOption from '@/components/home/GameOption.vue'

export default defineComponent({
  components: {
    GameTitle,
    GameOption
  },
  setup () {
    const state = reactive({
      title: '天天斗地主',
      option: [
        { id: 1, name: 'A', value: 14, type: 0, text: '初级' },
        { id: 2, name: 'A', value: 14, type: 1, text: '中级' },
        { id: 3, name: 'A', value: 14, type: 2, text: '高级' },
        { id: 4, name: 'A', value: 14, type: 3, text: '自由' }
      ],
      target: 0
    })

    const router = useRouter()

    const selectGame = (item) => {
      state.target = item.id

      setTimeout(() => {
        router.push(`/room/${item.id}`)
      }, 500)
    }

    return {
      state,
      selectGame
    }
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
