<template>
  <header class="header">
    <div class="header__logo">
      <AppLogo />
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
import AppLogo from "@/common/components/AppLogo.vue";
import logout from "@/common/mixins/auth/logout";

export default {
  name: "AppLayoutHeader",

  components: {
    AppLogo,
  },

  mixins: [logout],

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["avatarPaths"]),
    ...mapGetters("Cart", ["cartValue"]),
  },

  methods: mapActions("Auth", ["logout"]),
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: $green-500;
  box-shadow: $shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: $white;
    background-color: $green-500;
    background-image: url("~@/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: $white;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: "";
    vertical-align: middle;

    background: url("~@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}

.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: "";
    vertical-align: middle;

    background: url("~@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
