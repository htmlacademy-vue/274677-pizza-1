<template>
  <input
    type="radio"
    class="visually-hidden"
    v-bind="$attrs"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  name: "AppRadioButton",
};
</script>
