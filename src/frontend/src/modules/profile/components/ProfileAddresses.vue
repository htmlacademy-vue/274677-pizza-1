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
<style scoped lang="scss">
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.address-form__edit {
  cursor: pointer;

  button {
    cursor: pointer;
  }
}

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}

.address-form:not(:last-child) {
  margin-bottom: 20px;
}
</style>
