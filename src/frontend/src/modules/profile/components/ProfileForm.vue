<template>
  <div class="layout__address">
    <form class="address-form address-form--opened sheet">
      <div class="address-form__header">
        <b>Адрес №{{addressNumber}}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <AppInput
            v-model="values.name"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            title="Название адреса*"
            required
            :error-text="validations.name.error"
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            v-model="values.street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            title="Улица*"
            required
            :error-text="validations.street.error"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="values.building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            title="Дом*"
            required
            :error-text="validations.building.error"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="values.flat"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            title="Квартира"
          />
        </div>
        <div class="address-form__input">
          <AppInput
            v-model="values.comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            title="Комментарий"
          />
        </div>
      </div>

      <div class="address-form__buttons">
        <AppButton
          v-show="mode === ADDRESS_FORM_MODE.EDIT"
          class="button--transparent"
          data-test="delete-address-button"
          @click="onDelete"
        >Удалить</AppButton>
        <AppButton
          type="submit"
          data-test="save-address-button"
          @click.prevent="onSave"
        >Сохранить</AppButton>
      </div>
    </form>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex";

import { ADDRESS_FORM_MODE } from "@/common/constants";
import AppInput from "@/common/components/AppInput.vue";
import AppButton from "@/common/components/AppButton.vue";
import validator from "@/common/mixins/validator";

export default {
  name: "ProfileForm",

  components: {
    AppInput,
    AppButton,
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
    ...mapState("Profile", ["addresses", "editedAddress", "mode"]),

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
    ...mapActions("Profile", ["editAddress", "deleteAddress", "newAddress"]),

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

<style lang="scss" scoped>
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

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

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
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
</style>
