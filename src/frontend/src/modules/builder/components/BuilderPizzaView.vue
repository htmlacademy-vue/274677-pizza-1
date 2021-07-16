<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        v-model="name"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
        @input="$emit('nameChange', name)"
      />
    </label>

    <AppDrop @drop="drop">
      <div class="content__constructor">
        <div
          class="pizza"
          :class="`pizza--foundation--${
            selectedItems.dough.value === 'light' ? 'small' : 'big'
          }-${selectedItems.sauce.value}`"
        >
          <div class="pizza__wrapper">
            <div
              v-for="item in ingredientsFilling"
              :key="item.id"
              class="pizza__filling"
              :class="item.class"
            >
            </div>
          </div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { COUNT_TO_WORD } from "@/common/constants";

const BASE_FILLING_CLASS = "pizza__filling--";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  props: {
    selectedItems: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      COUNT_TO_WORD,
      name: "",
    };
  },

  computed: {
    ingredientsFilling() {
      return this.selectedItems.ingredients.reduce((acc, curr) => {
        const classes = [];

        for (let i = 1; i <= curr.count; i++) {
          const ingredientMod = `${BASE_FILLING_CLASS}${curr.value}`;

          classes.push({
            id: `${curr.value}-${i}`,
            class:
              i === 1
                ? ingredientMod
                : `${ingredientMod} ${BASE_FILLING_CLASS}${COUNT_TO_WORD[i]}`,
          });
        }

        return [...acc, ...classes];
      }, []);
    },
  },

  methods: {
    drop(data) {
      this.$emit("drop", data);
    },
  },
};
</script>
