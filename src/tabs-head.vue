<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GuluTabsHead",
    inject: ['eventBus'],
    mounted(){
      this.eventBus.$on('update:selected', (item, vm) => {
        let {width, height, top, left} = vm.$el.getBoundingClientRect()
        this.$refs.line.style.width = `${width}px` // 宽度就会跟着我们点的元素的宽度变,
        this.$refs.line.style.left = `${left}px` // 宽度变了我们再修改位置
        // this.$refs.line.style.transform = `translateX(${left}px)` // 可以这样优化写来实现硬件3d加速
      })
    }
  }
</script>

<style lang="scss" scoped>
  $tab-height: 40px;
  $blue: blue;
  .tabs-head {
    display: flex;
    height: $tab-height;
    justify-content: flex-start;
    position: relative;
    > .line {
      position: absolute;
      bottom: 0;
      border-bottom: 1px solid $blue;
      transition: all 400ms;
    }
    > .actions-wrapper {
      margin-left: auto; // 这样写可以让按钮靠右
    }
  }
</style>
