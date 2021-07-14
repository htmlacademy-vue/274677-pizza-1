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
            @change="$emit('radioChange', 'sizes', $event.target.value)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    AppRadioButton,
  },

  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
};
</script>
