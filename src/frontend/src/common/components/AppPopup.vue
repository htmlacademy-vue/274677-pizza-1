<template>
  <transition
    name="popup"
    appear
    @after-leave="$emit('afterLeave')"
  >
    <div
      class="popup"
      v-if="isOpen"
    >
      <a
        href="#"
        class="close"
        @click.prevent="$emit('close', $event)"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <slot />
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppPopup",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState("Popups", ["popups"]),

    isOpen() {
      if (this.popups[this.id]) {
        return this.popups[this.id].isOpen;
      }

      return false;
    },
  },
};
</script>
<style scoped>
.popup-enter-active {
  animation: fadeInDownCentered;
  animation-duration: var(--animate-duration);
}
.popup-leave-active {
  animation: fadeInDownCentered;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-direction: reverse;
}

@keyframes fadeInDownCentered {
  0% {
    opacity: 0;
    transform: translate3d(-50%, -100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
