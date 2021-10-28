<template>
  <div>
    <div class="layout__title">
      <AppTitle class="title--big">Мои данные</AppTitle>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          :srcset="`${avatarPaths.webp['2x']} 1x, ${avatarPaths.webp['4x']} 2x`"
        >
        <img
          width="72"
          height="72"
          :src="`${avatarPaths.jpg['2x']}`"
          :srcset="`${avatarPaths.jpg['4x']}`"
          :alt="user.name"
        >
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">Контактный телефон: <span>{{ user.phone }}</span></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AppTitle from "@/common/components/AppTitle";

export default {
  name: "ProfileHeader",

  components: {
    AppTitle,
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["avatarPaths"]),
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
