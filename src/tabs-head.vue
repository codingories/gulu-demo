<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GuluTabsHead",
    inject: ['eventBus'],
    created(){
      this.$emit('update:selected', '这是 tabs-head 抛出来的数据') // 这样写可以触发外面
    }
  }
</script>

<style lang="scss" scoped>
  $tab-height: 40px;
  .tabs-head {
    display: flex;
    height: $tab-height;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid red;
    > .actions-wrapper {
      margin-left: auto; // 这样写可以让按钮靠右
    }
  }
</style>
