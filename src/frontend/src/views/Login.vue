<template>
  <div class="sign-form">
    <router-link
      class="close close--white"
      to="./"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form>
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <AppInput
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
            :error-text="validations.email.error"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <AppInput
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
            required
            :error-text="validations.password.error"
          />
        </label>
      </div>
      <button
        type="submit"
        class="button"
        @click.prevent="onClick"
        @keyup.enter="onClick"
      >Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import validator from "@/common/mixins/validator";
import AppInput from "@/common/components/AppInput.vue";

export default {
  name: "Login",

  components: {
    AppInput,
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
