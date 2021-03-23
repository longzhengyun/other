<template>
  <div :class="{ open: open }" class="card-wrap">
    <div :class="{ show: !show, selected: selected }" class="card-box">
      <div
        :class="{ 'card-red': data.type === 1 || data.type === 3 }"
        class="card-front"
        @click="$emit('doAction', data)"
      >
        <div class="card-name">
          <div :class="{ 'name-text': data.name.length > 2 }">
            {{ data.name }}
          </div>
          <div v-if="data.id !== 53 && data.id !== 54">
            <template v-if="data.type === 0">
              &spades;
            </template>
            <template v-if="data.type === 1">
              &hearts;
            </template>
            <template v-if="data.type === 2">
              &clubs;
            </template>
            <template v-if="data.type === 3">
              &diams;
            </template>
          </div>
        </div>
        <div class="card-name card-copy">
          <div :class="{ 'name-text': data.name.length > 2 }">
            {{ data.name }}
          </div>
          <template v-if="data.id !== 53 && data.id !== 54">
            <template v-if="data.type === 0">
              &spades;
            </template>
            <template v-if="data.type === 1">
              &hearts;
            </template>
            <template v-if="data.type === 2">
              &clubs;
            </template>
            <template v-if="data.type === 3">
              &diams;
            </template>
          </template>
        </div>
        <div class="card-bg">
          {{ data.name.length > 3 ? data.name.substring(0, 1) : data.name }}
        </div>
      </div>
      <div class="card-back" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Card',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.card-wrap {
  width: 1.5vw;
  height: 8.8vw;
  overflow: visible;
}
.card-wrap.open {
  width: 6.3vw;
  margin: 0 0.5vw;
}
.card-box {
  position: relative;
  transform-style: preserve-3d;
  transition: 0.2s;
  width: 6.3vw;
  height: 8.8vw;
}
.card-box.show {
  transform: rotateY(180deg);
}
.card-box.selected {
  transform: translateY(-1vw);
}
.card-front,
.card-back {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid #fff;
  border-radius: 0.5vw;
  box-sizing: border-box;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  backface-visibility: hidden;
}
.card-front {
  background-color: #fff;
  color: black;
  font-family: fantasy;
}
.card-back {
  transform: rotateY(180deg);
  background-size: 0.5vw 0.5vw;
  background-color: #033e76;
  background-image: radial-gradient(#1e92c7 30%, transparent 31%);
}

.card-name {
  width: 1.5vw;
  padding: 0.2vw 0;
  margin-left: -2px;
  font-size: 1.5vw;
  line-height: 1.5vw;
  word-break: break-all;
  text-align: center;
}
.card-copy {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotateZ(180deg);
}
.card-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7vw;
  opacity: 0.05;
}
.name-text {
  word-break: break-all;
}
.card-red {
  color: red;
}
.card-btn {
  cursor: pointer;
}
</style>
