<template>
  <div>
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
      <form
        action="test.html"
        method="post"
      >
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              placeholder="example@mail.ru"
            >
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              type="password"
              name="pass"
              placeholder="***********"
            >
          </label>
        </div>
        <button
          type="submit"
          class="button"
        >Авторизоваться</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  mounted() {
    this.$root.isPopupOpen = true;
  },

  destroyed() {
    this.$root.isPopupOpen = false;
  },
};
</script>
