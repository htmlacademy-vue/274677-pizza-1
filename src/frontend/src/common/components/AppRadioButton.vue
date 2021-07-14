<template>
  <input
    type="radio"
    class="visually-hidden"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: "AppRadioButton",
};
</script>
