<template>
  <div class="model-wrap">
    {{ data }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GameTitle',
  props: {
    data: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>
.model-wrap {
  position: fixed;
  top: 8vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8vw;
  color: #fff;
  font-family: fangsong;
  font-weight: bold;
}
</style>
