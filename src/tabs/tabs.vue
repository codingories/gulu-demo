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
    methods: {
      checkChildren () {
        if (this.$children.length === 0) {
          console && console.warn &&
          console.warn('tabs的子组件应该是tabs-head和tabs-nav，但你没有写子组件')
        }
      },
      selectTab () {
        this.$children.forEach((vm) => {
          if (vm.$options.name === 'GuluTabsHead') {
            vm.$children.forEach((childVm) => {
              if (childVm.$options.name === 'GuluTabsItem'
                && childVm.name === this.selected) {
                this.eventBus.$emit('update:selected', this.selected, childVm)
              }
            })
          }
        })
      }
      // checkChildren(){
      //   if(this.$children.length===0){
      //     // 这个$children是看子组件，不是子元素
      //     console && console.warn && console.warn('tabs的子组件应该是tabs-head和tabs-pane,但你没有写子组件')
      //   }
      // },
      // selectTab(){
      //   let {left} = this.$el.getBoundingClientRect()
      //   const parentLeft = left
      //   console.log('----')
      //   console.log(left)
      //   console.log(parentLeft)
      //   this.$children.forEach((vm)=>{
      //     if(vm.$options.name === 'GuluTabsHead'){ // 找儿子
      //       vm.$children.forEach((childVm)=>{ // 找孙子
      //         if(childVm.$options.name === 'GuluTabsItem' && childVm.name === this.selected){
      //           console.log('00000000')
      //           console.log(this.selected,childVm,parentLeft)
      //           this.eventBus.$emit('update:selected', this.selected,childVm,parentLeft)
      //         }
      //       })
      //     }
      //   })
      // }
    },
    mounted(){
      this.checkChildren()
      this.selectTab()
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
  }
</style>
