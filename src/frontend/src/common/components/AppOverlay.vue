<template>
  <div
    class="overlay"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: "AppOverlay",
};
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
