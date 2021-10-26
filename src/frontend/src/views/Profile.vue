<template>
  <div>
    <ProfileHeader />

    <ProfileAddresses />

    <ProfileForm v-show="mode" />

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        data-test="new-address-button"
        @click="changeFormMode({mode: 'new', address: null})"
      >Добавить новый адрес</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { CHANGE_FORM_MODE } from "@/store/mutation-types";

import ProfileHeader from "@/modules/profile/components/ProfileHeader.vue";
import ProfileAddresses from "@/modules/profile/components/ProfileAddresses.vue";
import ProfileForm from "@/modules/profile/components/ProfileForm.vue";
import { auth } from "@/middlewares";

export default {
  name: "Profile",

  middlewares: [auth],

  layout: "AppLayoutSidebar",

  components: {
    ProfileForm,
    ProfileHeader,
    ProfileAddresses,
  },

  computed: mapState("Profile", ["mode", "addresses"]),

  created() {
    if (!this.addresses.length) {
      this.fetchAddresses();
    }
  },

  methods: {
    ...mapMutations("Profile", {
      changeFormMode: CHANGE_FORM_MODE,
    }),
    ...mapActions("Profile", ["fetchAddresses"]),
  },
};
</script>
