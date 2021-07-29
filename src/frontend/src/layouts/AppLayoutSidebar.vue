<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <a
        href="index.html"
        class="logo layout__logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        >
      </a>

      <router-link
        class="layout__link"
        to="/orders"
      >
        История заказов
      </router-link>
      <router-link
        class="layout__link layout__link--active"
        to="/profile"
      >
        Мои данные
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
};
</script>
