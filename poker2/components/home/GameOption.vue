<template>
  <ul class="model-list">
    <li
      v-for="(item, key) in data"
      :key="key"
      class="list-item"
      @click="$emit('doAction', item)"
    >
      <div :class="{ hide: key + 1 === target }" class="item-name">
        {{ item.text }}
      </div>
      <card :data="item" :show="key + 1 === target" :open="true" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Card from '@/components/common/Card.vue'

export default defineComponent({
  name: 'GameOption',
  components: {
    Card
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    target: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style scoped>
.model-list,
.model-list .item-name {
  top: 50%;
  left: 50%;
}

.model-list {
  position: fixed;
  transform: translateX(-50%) scale(2.5);
  display: flex;
}

.model-list .list-item {
  position: relative;
  cursor: pointer;
}

.model-list .item-name {
  position: absolute;
  z-index: 9;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 2vw;
  text-align: center;
}

.model-list .item-name.hide {
  display: none;
}
</style>
