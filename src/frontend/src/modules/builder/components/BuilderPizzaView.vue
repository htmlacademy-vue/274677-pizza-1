<template>
  <div>
    <AppInput
      v-model.lazy="pizzaName"
      title="Название пиццы"
      name="pizza_name"
      placeholder="Введите название пиццы"
      hide-title
      required
    />

    <AppDrop @drop="drop">
      <div class="content__constructor">
        <div
          class="pizza"
          :class="pizzaFoundationClass"
        >
          <div class="pizza__wrapper">
            <transition-group name="ingredients">
              <div
                v-for="item in ingredientsFilling"
                :key="item.id"
                class="pizza__filling"
                :class="item.class"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { CHANGE_PIZZA_INGREDIENT } from "@/store/mutation-types";

import AppDrop from "@/common/components/AppDrop";
import AppInput from "@/common/components/AppInput";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
    AppInput,
  },

  computed: {
    ...mapState("Builder", ["name"]),
    ...mapGetters("Builder", ["selectedItems", "ingredientsFilling"]),

    pizzaName: {
      get() {
        return this.name;
      },
      set(value) {
        this.changeName(value);
      },
    },

    pizzaFoundationClass() {
      const dough =
        this.selectedItems.dough.value === "light" ? "small" : "big";
      return `pizza--foundation--${dough}-${this.selectedItems.sauce.value}`;
    },
  },

  methods: {
    ...mapActions("Builder", ["changeName"]),
    ...mapMutations("Builder", {
      changeIngredient: CHANGE_PIZZA_INGREDIENT,
    }),

    drop(ingredient) {
      this.changeIngredient({ ingredient, countType: "increase" });
    },
  },
};
</script>
<style scoped lang="scss">
.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}

.ingredients-enter-active,
.ingredients-leave-active {
  transition: all var(--animate-duration) ease;
}
.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
