<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"

  export default {
    name: "GuluCollapse",
    props: {
      single: {
        type: Boolean,
        default: false
      },
      selected: {
        type: Array,
      }
    },
    data() {
      return {
        eventBus: new Vue(),
        selectedArray: []
      }
    },
    provide() {
        return {
          eventBus: this.eventBus
        }
    },
    mounted(){
      this.eventBus.$emit('update:selected',this.selected) // 一开始就通知所有儿子，该选中就选中
      this.eventBus.$on('update:addSelected', (name)=>{
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        // 如果用户添加一个我就把selected拷贝一份，因为vue不支持直接修改props
        if(this.single){
          selectedCopy = [name]
        }else{
          selectedCopy.push(name)
        }
        this.eventBus.$emit('update:selected',selectedCopy)  // 得到最新被选中的item之后,通知儿子
        this.$emit('update:selected',selectedCopy) // 通知外面
      })

      this.eventBus.$on('update:removeSelected', (name)=>{
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        let index = selectedCopy.indexOf(name)
        selectedCopy.splice(index,1)
        this.eventBus.$emit('update:selected',selectedCopy) // 如果用户想移除，也通知他儿子该移除就移除
        this.$emit('update:selected',selectedCopy)
      })
      this.$children.forEach((vm)=>{
        vm.single = this.single
      })
    }
  }

</script>

<style lang="scss" scoped>
  $grey: #ddd;
  $border-radius: 4px;
  .collapse {
    border: 1px solid $grey;
    border-radius: $border-radius;
  }
</style>
