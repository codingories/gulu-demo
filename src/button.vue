<template>
  <button
    class="g-button"
    :class="{[`icon-${iconPosition}`]:true}"
    @click="$emit('click')"
  >
    <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
    <div class="content1">
      <slot></slot>
    </div>
  </button>
</template>
<script>
// import Vue from 'vue'
import Icon from "./icon";

// Vue.component('g-icon',Icon) // 全局注册的方法不好，该用局部注册
export default {
  name: 'GuluButton',
  components: {
    "g-icon": Icon
  },
  props: {
    icon: {},
    loading: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: "left",
      validator: function(value) {
        return value === "left" || value === "right";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-size: 14px;
$button-height: 32px;
$button-bg: white;
$button-active-bg: #eee;
$border-radius: 4px;
$color: #333;
$border-color: #999;
$border-color-hover: #666;
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.g-button {
  font-size: $font-size;
  height: $button-height;
  padding: 0 1em; /*width*/
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background: $button-bg;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;


  &:hover {
    border-color: $border-color;
  }

  &:active {
    background-color: $button-active-bg;
  }

  &:focus {
    outline: none;
  }
  > .content1 {
    order: 2;
  }
  > .icon {
    order: 1;
    margin-right: 0.3em;
  }

  &.icon-right {
    > .content1 {
      order: 1;
    }
    > .icon {
      order: 2;
      margin-right: 0;
      margin-left: 0.3em;
    }
  }
  .loading {
    animation: spin 2s infinite linear;
  }
}
</style>
