<template>
  <div>
    <g-button>打开</g-button>
    <g-button icon="setting">默认按钮</g-button>
    <g-button :loading="true">默认按钮</g-button>
    <g-button disabled>默认按钮</g-button>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import Icon from '../../../src/Icon.vue'
  import Button from '../../../src/button.vue'
  export default {
    components:{
      'g-button': Button,
      'g-icon': Icon
    },
    data(){
      return {
        content:`
        <g-button>打开</g-button>
        <g-button icon="setting">默认按钮</g-button>
        <g-button :loading="true">默认按钮</g-button>
        <g-button disabled>默认按钮</g-button>
      `
      }
    }
  }
</script>
