<template>
  <div v-if="show" class="loader" :style="styles"></div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 4
    }
  },
  computed: {
    styles() {
      return {
        borderWidth: `${Number(this.width)}px`,
        width: `${Number(this.size)}px`,
        height: `${Number(this.size)}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  position: relative;
  text-indent: -9999em;
  border-top: 4px solid rgba($gray-400, 0.2);
  border-right: 4px solid rgba($gray-400, 0.2);
  border-bottom: 4px solid rgba($gray-400, 0.2);
  border-left: 4px solid $primary;
  transform: translateZ(0);
  animation: load 0.9s infinite linear;
}
@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
