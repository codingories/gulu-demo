<template>
  <div class="popover" @click="onClick" ref="popover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" style="display: inline-block">
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
      onClickDocument(e){
        if ( this["$refs"]["popover"] && (this["$refs"]["popover"] &&
          this["$refs"]["popover"].contains(e.target))) {return}
        if ( this["$refs"]["contentWrapper"] && (this["$refs"]["contentWrapper"] &&
          this["$refs"]["contentWrapper"].contains(e.target))) {return}
        else {
          this.close()
        }
      },
      positionContent() {
        document.body.appendChild(this["$refs"]["contentWrapper"])
        let {top, left} = this["$refs"]["triggerWrapper"].getBoundingClientRect()
        this["$refs"]["contentWrapper"].style.left = left + window.scrollX + "px"
        this["$refs"]["contentWrapper"].style.top = top + window.scrollY + "px"
      },

      open(){
        this.visible = true
        setTimeout(() => {
          this.positionContent()
          document.addEventListener("click", this.onClickDocument)
        })
      },
      close(){
        this.visible = false
        document.removeEventListener("click", this.onClickDocument)
      },
      onClick(event) {
        if (this["$refs"]["triggerWrapper"].contains(event.target)) {
          if (this.visible === true) {
            this.close()
          } else {
            this.open()
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
  $border-color: #333;
  $border-radius: 4px;
  .popover {
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  .content-wrapper { // 如果写了scoped,popover里面那么就只作用于popover里面,移到外面就在外面了就可以
    position: absolute;
    border: 1px solid  $border-color;
    border-radius: $border-radius;
    filter: drop-shadow(0 0 1px rgba(0,0,0,0.5));
    /*通过drop-shadow解决小三角没有阴影的问题，但是兼容性不好 */
    /*box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);*/
    background: white;
    transform: translateY(-100%);
    margin-top: -10px;
    padding: .5em 1em;
    max-width: 20em;
    word-break: break-all;
    &::before ,  &::after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border: 10px solid transparent;
      left: 10px;
    }
    &::after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border: 10px solid transparent;
      left: 10px;
    }
    &::before {
      border-top-color: black;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
</style>
