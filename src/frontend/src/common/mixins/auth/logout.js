export default {
  methods: {
    async $logout() {
      await this.$store.dispatch("Auth/logout", true);
      this.$notifier.success("Вы успешно вышли");
      this.$router.push("/login");
    },
  },
};
