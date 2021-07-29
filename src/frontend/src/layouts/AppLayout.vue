<template>
  <div class="layout-wrapper">
    <AppOverlay v-show="$root.isPopupOpen" />
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
import AppLayoutHeader from "./AppLayoutHeader.vue";
import AppOverlay from "@/common/components/AppOverlay.vue";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta.layout;
      return layout && (() => import(`@/layouts/${layout}.vue`));
    },
  },

  components: {
    AppLayoutHeader,
    AppOverlay,
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
