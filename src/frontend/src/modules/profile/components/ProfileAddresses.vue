<template>
  <div class="layout__address">
    <div
      v-for="(address, index) in addresses"
      :key="address.id"
      class="sheet address-form"
    >
      <div class="address-form__header">
        <b>Адрес №{{index + 1}}. {{address.name}}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            data-test="edit-address-button"
            @click="onClick(address)"
          ><span class="visually-hidden">Изменить адрес</span></button>
        </div>
      </div>
      <p>{{ address.street }}, д.{{ address.building }}, {{ address.flat ? `кв.${address.flat}` : ''}}</p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CHANGE_FORM_MODE } from "@/store/mutation-types";

export default {
  name: "ProfileAddresses",

  computed: mapState("Profile", ["addresses", "editedAddress"]),

  methods: {
    ...mapMutations("Profile", {
      changeFormMode: CHANGE_FORM_MODE,
    }),

    onClick(address) {
      if (this.editedAddress && this.editedAddress.id === address.id) {
        return;
      }

      this.changeFormMode({ mode: "edit", address });
    },
  },
};
</script>
<style scoped>
.address-form:not(:last-child) {
  margin-bottom: 20px;
}
</style>
