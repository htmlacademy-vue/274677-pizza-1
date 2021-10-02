<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

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

import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    AppRadioButton,
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
