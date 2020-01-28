<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "GuluTabs",
    props: {
      selected: {
        type: String,
        required: true
      }
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(value){
        return ['horizontal', 'vertical'].indexOf(value) >= 0
      }
    },
    data(){
      return {
        eventBus: new Vue()
      }
    },
    provide(){
      return {
        eventBus:this.eventBus
      }
    },
    created(){
      // this.$emit('update:selected', '这是 this $emit 出来的数据') // 这样写可以触发外面
      // this.eventBus.$emit('update:selected', '这是 this event $emit 出来的数据') // 这样写不可以触发外面
      // this.$emit('update:selected','xxx')
    },
    mounted(){
      // this.$emit('update:selected', '这是 this $emit 出来的数据') // 这样写可以触发外面
      this.eventBus.$emit('update:selected', this.selected) // 这样写不可以触发外面
      // this.$emit('update:selected','xxx')
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
  }
</style>
