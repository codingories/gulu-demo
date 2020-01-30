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
      onClickDocument(e){
        if ( this["$refs"]["popover"] && (this["$refs"]["popover"] &&
          this["$refs"]["popover"].contains(e.target))) {return}
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
