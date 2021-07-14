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
              v-for="item in selectedItems.ingredients"
              :key="item.value"
              class="pizza__filling"
              :class="`pizza__filling--${item.value} ${
                item.count > 1
                  ? 'pizza__filling--' + COUNT_TO_WORD[item.count]
                  : ''
              }`"
            />
          </div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { COUNT_TO_WORD } from "@/common/constants";

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

  methods: {
    drop(data) {
      this.$emit("drop", data);
    },
  },
};
</script>
