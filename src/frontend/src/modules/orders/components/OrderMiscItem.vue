<template>
  <li>
    <img
      width="20"
      height="30"
      :src="miscItem.image"
      :alt="miscItem.name"
    >
    <p>
      <span>{{ miscItem.name }}</span>
      <b>{{ miscItem.price.text }} ₽</b>
    </p>
  </li>
</template>

<script>
export default {
  name: "OrderMiscItem",

  props: {
    miscItem: {
      type: Object,
      required: true,
      default() {
        return {
          name: "",
          image: "",
          price: {
            text: "",
          },
        };
      },
    },
  },
};
</script>
