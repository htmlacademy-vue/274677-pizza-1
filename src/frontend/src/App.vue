<template>
  <div id="app">
    <AppLayout>
      <transition
        name="view"
        appear
        :enter-active-class="transitionClass"
        mode="out-in"
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  computed: {
    transitionClass() {
      return this.$route.name === "Login"
        ? "animate__slideInDown_centered"
        : "animate__animated animate__slideInDown";
    },
  },

  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    if (!this.$store.state.Auth.user && this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

#app {
  min-height: inherit;
}

.animate__slideInDown_centered {
  animation: slideInDownCentered;
  animation-duration: var(--animate-duration);
  animation-fill-mode: both;
}

@keyframes slideInDownCentered {
  0% {
    transform: translate3d(-50%, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
