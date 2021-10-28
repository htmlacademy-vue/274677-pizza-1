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
            root-class="additional-list__counter"
            :count="miscItem.count"
            :additional-emit-data="miscItem"
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

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
