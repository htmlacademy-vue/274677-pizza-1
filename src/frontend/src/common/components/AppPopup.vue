<template>
  <div
    class="popup"
    v-if="isOpen"
  >
    <a
      href="#"
      class="close"
      @click="$emit('close', $event)"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppPopup",

  computed: {
    ...mapState("Popups", ["popups"]),

    isOpen() {
      if (this.popups[this.id]) {
        return this.popups[this.id].isOpen;
      }

      return false;
    },
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>
