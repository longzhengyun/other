<template>
  <section class="container" />
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted
} from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  setup () {
    const state = reactive({})

    onMounted(() => {})

    return {
      state
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
