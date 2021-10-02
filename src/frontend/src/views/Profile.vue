<template>
  <div>
    <ProfileHeader />

    <ProfileAddresses />

    <ProfileForm v-show="mode" />

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="changeFormMode({mode: 'new', address: null})"
      >Добавить новый адрес</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { CHANGE_FORM_MODE } from "@/store/mutation-types";

import ProfileHeader from "@/modules/profile/components/ProfileHeader.vue";
import ProfileAddresses from "@/modules/profile/components/ProfileAddresses.vue";
import ProfileForm from "@/modules/profile/components/ProfileForm.vue";

export default {
  name: "Profile",

  components: {
    ProfileForm,
    ProfileHeader,
    ProfileAddresses,
  },

  computed: {
    ...mapState("Addresses", ["mode"]),
    ...mapGetters("Auth", ["avatarPaths"]),
  },

  created() {
    if (!this.addresses) {
      this.fetchAddresses();
    }
  },

  methods: {
    ...mapMutations("Addresses", {
      changeFormMode: CHANGE_FORM_MODE,
    }),
    ...mapActions("Addresses", ["fetchAddresses"]),
  },
};
</script>
