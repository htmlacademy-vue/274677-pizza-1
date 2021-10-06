<template>
  <div class="layout-wrapper">
    <transition
      name="overlay"
      appear
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <AppOverlay v-show="isAnyPopupOpen" />
    </transition>
    <AppNotifications />
    <AppLayoutHeader />
    <template v-if="layout">
      <component :is="layout">
        <slot />
      </component>
    </template>
    <slot v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppLayoutHeader from "./AppLayoutHeader.vue";
import AppOverlay from "@/common/components/AppOverlay.vue";
import AppNotifications from "@/common/components/AppNotifications.vue";

export default {
  name: "AppLayout",

  components: {
    AppLayoutHeader,
    AppOverlay,
    AppNotifications,
  },

  computed: {
    ...mapGetters("Popups", ["isAnyPopupOpen"]),
    layout() {
      const layout = this.$route.meta.layout;
      return layout && (() => import(`@/layouts/${layout}.vue`));
    },
  },
};
</script>

<style scoped>
.layout-wrapper {
  min-height: inherit;
  display: flex;
  flex-direction: column;
}
</style>
