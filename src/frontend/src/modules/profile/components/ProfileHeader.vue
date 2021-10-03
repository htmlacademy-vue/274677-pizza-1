<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
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

export default {
  name: "ProfileHeader",

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["avatarPaths"]),
  },
};
</script>
