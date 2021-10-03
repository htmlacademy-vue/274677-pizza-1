<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link
        to="/"
        class="logo layout__logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        >
      </router-link>

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
export default {
  name: "AppLayoutSidebar",

  data() {
    return {
      layoutLinks: [
        {
          text: "История заказов",
          to: "/orders",
          isActive: this.$router.currentRoute.path === "/orders",
        },
        {
          text: " Мои данные",
          to: "/profile",
          isActive: this.$router.currentRoute.path === "/profile",
        },
      ],
    };
  },
};
</script>
