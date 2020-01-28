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

    },
    mounted(){
      this.$children.forEach((vm)=>{
        if(vm.$options.name === 'GuluTabsHead'){ // 找儿子
          vm.$children.forEach((childVm)=>{ // 找孙子
            if(childVm.$options.name === 'GuluTabsItem' && childVm.name === this.selected){
              this.eventBus.$emit('update:selected', this.selected,childVm)
            }
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
  }
</style>
