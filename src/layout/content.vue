<template>
  <div class="content1">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  export default {
    name: "content.vue"
  }
</script>

<style lang="scss" scoped>
  .content1 {
    flex-grow: 1;
  }
</style>
