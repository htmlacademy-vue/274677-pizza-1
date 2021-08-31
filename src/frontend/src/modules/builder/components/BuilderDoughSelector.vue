<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

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
            @change="change({type: 'dough', value: $event.target.value})"
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
import { CHANGE_PIZZA_TYPE } from "@/store/mutation-types";

export default {
  name: "BuilderDoughSelector",

  components: {
    AppRadioButton,
  },

  computed: {
    ...mapState("Builder", ["dough"]),
  },

  methods: {
    ...mapMutations("Builder", {
      change: CHANGE_PIZZA_TYPE,
    }),
  },
};
</script>
