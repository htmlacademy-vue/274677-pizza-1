<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <AppLogo class="layout__logo" />

      <router-link
        v-for="(link, index) in layoutLinks"
        :key="index"
        class="layout__link"
        active-class="layout__link--active"
        :to="link.to"
      >
        {{ link.text }}
      </router-link>
    </div>

    <div class="layout__content">
      <slot />
    </div>
  </main>
</template>

<script>
import AppLogo from "@/common/components/AppLogo.vue";

export default {
  name: "AppLayoutSidebar",

  components: {
    AppLogo,
  },

  data() {
    return {
      layoutLinks: [
        {
          text: "История заказов",
          to: "/orders",
        },
        {
          text: " Мои данные",
          to: "/profile",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  flex-grow: 1;

  background-color: rgba($green-500, 0.05);
}
</style>
