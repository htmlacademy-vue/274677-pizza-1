<template>
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
