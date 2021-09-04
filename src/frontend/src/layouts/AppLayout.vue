<template>
  <div class="layout-wrapper">
    <AppOverlay v-show="isAnyPopupOpen" />
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

  computed: {
    ...mapGetters("Popups", ["isAnyPopupOpen"]),
    layout() {
      const layout = this.$route.meta.layout;
      return layout && (() => import(`@/layouts/${layout}.vue`));
    },
  },

  components: {
    AppLayoutHeader,
    AppOverlay,
    AppNotifications,
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
