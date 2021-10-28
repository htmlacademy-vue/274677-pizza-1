<template>
  <div class="content__dough">
    <div class="sheet">
      <AppTitle
        tag="h2"
        class="title--small sheet__title"
      >Выберите тесто</AppTitle>

      <div class="sheet__content dough">
        <label
          v-for="(doughItem, index) in dough"
          :key="index"
          class="dough__input"
          :class="`dough__input--${doughItem.value}`"
        >
          <AppRadioButton
            name="dough"
            :value="doughItem.value"
            :checked="doughItem.checked"
            @change="onChange"
          />
          <b>{{ doughItem.name }}</b>
          <span>{{ doughItem.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppTitle from "@/common/components/AppTitle";
import { CHANGE_PIZZA_TYPE } from "@/store/mutation-types";

export default {
  name: "BuilderDoughSelector",

  components: {
    AppRadioButton,
    AppTitle,
  },

  computed: mapState("Builder", ["dough"]),

  methods: {
    ...mapMutations("Builder", {
      change: CHANGE_PIZZA_TYPE,
    }),

    onChange(value) {
      this.change({ type: "dough", value });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
