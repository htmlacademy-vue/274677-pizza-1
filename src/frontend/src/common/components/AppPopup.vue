<template>
  <transition
    name="popup"
    appear
    @after-leave="$emit('afterLeave')"
  >
    <div
      v-if="isOpen"
      class="popup"
      data-test="popup"
    >
      <a
        href="#"
        class="close"
        @click.prevent="$emit('close', $event)"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <slot />
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppPopup",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState("Popups", ["popups"]),

    isOpen() {
      if (this.popups[this.id]) {
        return this.popups[this.id].isOpen;
      }

      return false;
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/assets/scss/mixins/m_center.scss";

.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}

.popup-enter-active {
  animation: fadeInDownCentered;
  animation-duration: var(--animate-duration);
}

.popup-leave-active {
  animation: fadeInDownCentered;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-direction: reverse;
}

@keyframes fadeInDownCentered {
  0% {
    opacity: 0;
    transform: translate3d(-50%, -100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
