export default {
  methods: {
    async $login(data) {
      await this.$store.dispatch("Auth/login", data);
      this.$router.push("/");
    },
  },
};
