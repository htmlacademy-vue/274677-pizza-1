<template>
  <div class="content__diameter">
    <div class="sheet">
      <AppTitle
        tag="h2"
        class="title--small sheet__title"
      >Выберите размер</AppTitle>

      <div class="sheet__content diameter">
        <label
          v-for="(size, index) in sizes"
          :key="index"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
        >
          <AppRadioButton
            name="diameter"
            :value="size.value"
            :checked="size.checked"
            @change="onChange"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CHANGE_PIZZA_TYPE } from "@/store/mutation-types";

import AppTitle from "@/common/components/AppTitle";
import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    AppRadioButton,
    AppTitle,
  },

  computed: mapState("Builder", ["sizes"]),

  methods: {
    ...mapMutations("Builder", {
      change: CHANGE_PIZZA_TYPE,
    }),

    onChange(value) {
      this.change({ type: "sizes", value });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";
.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("~@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
