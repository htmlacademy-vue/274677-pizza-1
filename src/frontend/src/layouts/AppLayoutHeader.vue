<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        to='/'
        class="logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        >
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to='/cart'>{{ cartValue }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link
        v-if="user"
        to="/profile"
      >
        <picture data-test="user-picture">
          <source
            type="image/webp"
            :srcset="`${avatarPaths.webp['1x']} 1x, ${avatarPaths.webp['2x']} 2x`"
          >
          <img
            width="32"
            height="32"
            :src="avatarPaths.jpg['1x']"
            :srcset="avatarPaths.jpg['2x']"
            :alt="user.name"
          >
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <router-link
        :to="`${user ? '/' : '/login'}`"
        :class="`header__${user ? 'logout' : 'login'}`"
        data-test="login-link"
        @click.native="user && $logout()"
      >
        <span>{{ user ? 'Выйти' : 'Войти'}}</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import logout from "@/common/mixins/auth/logout";

export default {
  name: "AppLayoutHeader",

  mixins: [logout],

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["avatarPaths"]),
    ...mapGetters("Cart", ["cartValue"]),
  },

  methods: mapActions("Auth", ["logout"]),
};
</script>
