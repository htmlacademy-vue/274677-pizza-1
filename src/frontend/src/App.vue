<template>
  <div id="app">
    <AppLayout>
      <Index />
    </AppLayout>
  </div>
</template>

<script>
import Index from "./views/Index.vue";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: {
    Index,
    AppLayout,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
