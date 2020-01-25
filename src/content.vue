<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  export default {
    name: "content.vue"
  }
</script>

<style lang="scss" scoped>
  .content {
    flex-grow: 1;
  }
</style>
