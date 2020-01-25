export default {
  install(Vue, options){
    Vue.prototype.$toast = function (message) {
      alert(message)
    }
  }
}
