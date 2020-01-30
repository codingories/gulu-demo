<template>
  <div class="popover" @click="onClick" ref="popover">
    <!--    .stop-->
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
      <!--      @click.stop-->
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
  export default {
    name: "GuluPopover",
    data() {
      return {
        visible: false
      }
    },
    methods: {
      positionContent() {
        document.body.appendChild(this["$refs"]["contentWrapper"])
        let {top, left} = this["$refs"]["triggerWrapper"].getBoundingClientRect()
        this["$refs"]["contentWrapper"].style.left = left + window.scrollX + "px"
        this["$refs"]["contentWrapper"].style.top = top + window.scrollY + "px"
      },
      listenToDocument() {
        let eventHandler = (e) => {
          if (this["$refs"]["contentWrapper"].contains(e.target)) { // 这句话解决了点击内容消失的问题
          } else {
            this.visible = false
            console.log('关闭')
            document.removeEventListener("click", eventHandler)
            console.log("关闭") // document事件引起的
          }
        }
        document.addEventListener("click", eventHandler)
      },
      listenToDocument(){
        let eventHandler = (e) => {
          if ( this["$refs"]["contentWrapper"] &&
            this["$refs"]["contentWrapper"].contains(e.target)) { // 这句话解决了点击内容消失的问题
            return
          } else {
            this.visible = false
            document.removeEventListener("click", eventHandler)
            console.log("关闭") // document事件引起的
          }
        }
        document.addEventListener("click", eventHandler)
      },
      opShow(){
        setTimeout(() => {
          this.positionContent()
          this.listenToDocument()
        })
      },
      onClick(event) {
        if (this["$refs"]["triggerWrapper"].contains(event.target)) {
          this.visible = !this.visible
          if (this.visible === true) {
            this.opShow()
          } else {
            console.log('关闭')
          }
        }
      }
    },
    mounted() {
      console.log(this.$refs.triggerWrapper)
    }
  }
</script>

<style lang="scss" scoped>
  .popover {
    display: inline-block;
    vertical-align: top;
    position: relative;
  }

  .content-wrapper { // 如果写了scoped,popover里面那么就只作用于popover里面,移到外面就在外面了就可以
    position: absolute;
    border: 1px solid red;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    transform: translateY(-100%);
  }
</style>
