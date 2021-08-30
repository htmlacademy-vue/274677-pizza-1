<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="(miscItem) in misc"
        :key="miscItem.name"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            width="39"
            height="60"
            :src="miscItem.image"
            :alt="miscItem.name"
          />
          <span>{{ miscItem.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <AppItemCounter
            disabled
            :count="miscItem.count"
            :additional-emit-data="miscItem"
            :root-class="'additional-list__counter'"
            :buttons="getButtonProps(miscItem.count)"
            @countChange="countChange"
          />
          <div class="additional-list__price">
            <b>{{ miscItem.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppItemCounter from "@/common/components/AppItemCounter.vue";
import { CHANGE_MISC_COUNT } from "@/store/mutation-types";

export default {
  name: "CartMisc",

  components: {
    AppItemCounter,
  },

  computed: {
    ...mapState("Cart", ["misc"]),
  },

  methods: {
    ...mapMutations("Cart", {
      changeMisc: CHANGE_MISC_COUNT,
    }),

    countChange(misc, countType) {
      this.changeMisc({ misc, countType });
    },

    getButtonProps(count) {
      return {
        increase: {
          class: "counter__button--orange",
        },
        decrease: {
          disabled: count <= 0,
        },
      };
    },
  },
};
</script>
