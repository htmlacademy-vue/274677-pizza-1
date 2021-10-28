<template>
  <div class="sign-form">
    <router-link
      class="close close--white"
      to="./"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <AppTitle class="title--small">Авторизуйтесь на сайте</AppTitle>
    </div>
    <form>
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          title="E-mail"
          required
          :error-text="validations.email.error"
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="password"
          type="password"
          name="pass"
          placeholder="***********"
          title="Пароль"
          required
          :error-text="validations.password.error"
        />
      </div>
      <AppButton
        type="submit"
        @click.prevent="onClick"
        @keyup.enter="onClick"
      >Авторизоваться</AppButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import validator from "@/common/mixins/validator";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import AppTitle from "@/common/components/AppTitle";
import { isLoggedIn } from "@/middlewares";

export default {
  name: "Login",

  middlewares: [isLoggedIn],

  components: {
    AppInput,
    AppButton,
    AppTitle,
  },

  mixins: [validator],

  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["email", "required"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  watch: {
    email() {
      this.validations.email.error = "";
    },
    password() {
      this.validations.password.error = "";
    },
  },

  created() {
    this.$popup.register("login");
  },

  mounted() {
    this.$popup.open("login");
  },

  destroyed() {
    this.$popup.close("login");
  },

  methods: {
    ...mapActions("Auth", ["login"]),

    async onClick() {
      const { isValid, validations } = this.$validateFields(
        { email: this.email, password: this.password },
        this.validations
      );
      if (!isValid) {
        this.validations = validations;
        return;
      }
      await this.login({
        email: this.email,
        password: this.password,
      });
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>
