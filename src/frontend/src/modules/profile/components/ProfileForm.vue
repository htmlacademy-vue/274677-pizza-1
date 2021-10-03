<template>
  <div class="layout__address">
    <form class="address-form address-form--opened sheet">
      <div class="address-form__header">
        <b>Адрес №{{this.addressNumber}}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <AppInput
              v-model="values.name"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
              :error-text="validations.name.error"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <AppInput
              v-model="values.street"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
              :error-text="validations.street.error"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <AppInput
              v-model="values.building"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
              :error-text="validations.building.error"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <AppInput
              v-model="values.flat"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <AppInput
              v-model="values.comment"
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          v-show="mode === ADDRESS_FORM_MODE.EDIT"
          @click="onDelete"
        >Удалить</button>
        <button
          type="submit"
          class="button"
          @click.prevent="onSave"
        >Сохранить</button>
      </div>
    </form>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex";

import { ADDRESS_FORM_MODE } from "@/common/constants";
import AppInput from "@/common/components/AppInput.vue";
import validator from "@/common/mixins/validator";

export default {
  name: "ProfileForm",

  components: {
    AppInput,
  },

  mixins: [validator],

  data() {
    return {
      ADDRESS_FORM_MODE,
      values: {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  computed: {
    ...mapState("Addresses", ["addresses", "editedAddress", "mode"]),

    addressNumber() {
      if (this.mode === ADDRESS_FORM_MODE.NEW) {
        return this.addresses.length + 1;
      } else if (this.mode === ADDRESS_FORM_MODE.EDIT) {
        return (
          this.addresses.findIndex(
            (item) => item.id === this.editedAddress.id
          ) + 1
        );
      }

      return 0;
    },
  },

  watch: {
    mode(newValue) {
      if (newValue === ADDRESS_FORM_MODE.NEW) {
        this.clearValues();
      }
    },

    editedAddress(newValue, oldValue) {
      if (newValue === null || (oldValue && newValue.id === oldValue.id)) {
        return;
      }

      const { id, userId, ...rest } = newValue; //eslint-disable-line
      Object.keys(rest).forEach((key) => {
        this.values[key] = rest[key];
      });
    },

    "values.name"() {
      this.validations.name.error = "";
    },

    "values.street"() {
      this.validations.street.error = "";
    },

    "values.building"() {
      this.validations.building.error = "";
    },
  },

  methods: {
    ...mapActions("Addresses", ["editAddress", "deleteAddress", "newAddress"]),

    onSave() {
      const { isValid, validations } = this.$validateFields(
        {
          name: this.values.name,
          street: this.values.street,
          building: this.values.building,
        },
        this.validations
      );
      if (!isValid) {
        this.validations = validations;
        return;
      }

      if (this.mode === ADDRESS_FORM_MODE.EDIT) {
        const { id, userId } = this.editedAddress;
        const address = {
          ...this.values,
          id,
          userId,
        };
        this.editAddress(address);

        this.clearValues();
      }

      if (this.mode === ADDRESS_FORM_MODE.NEW) {
        this.newAddress({ ...this.values });
        this.clearValues();
      }
    },

    onDelete() {
      if (this.mode === ADDRESS_FORM_MODE.EDIT) {
        const { id } = this.editedAddress;

        this.deleteAddress(id);

        this.clearValues();
      }
    },

    clearValues() {
      Object.keys(this.values).forEach((key) => {
        this.values[key] = "";
      });
    },
  },
};
</script>
