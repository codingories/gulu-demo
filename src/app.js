import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: true,
    loading3: false

  }
})

import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)

const expect = chai.expect
try {
// 单元测试
  {
    // 测试按钮含有 icon
    const Constructor = Vue.extend(Button)
    const button = new Constructor({
      propsData: {
        icon: 'setting'
      }
    })
    button.$mount() // 挂到内存
    // button.$mount('#test') // 直接挂到dom
    let useElement = button.$el.querySelector('use') // vm里面找有没有use的标签
    let href = useElement.getAttribute('xlink:href');
    expect(href).to.eq('#isetting')
    // 如果你的主观判断和实际事实是一样的，说明测试用例通过了
    button.$el.remove()
    button.$destroy()
  }
  {
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'setting',
        loading: true
      }
    })
    vm.$mount() // 挂到内存
    let useElement = vm.$el.querySelector('use')
    let href = useElement.getAttribute('xlink:href');
    expect(href).to.eq('#iloading')
    vm.$el.remove()
    vm.$destroy()
  }
  {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'setting',
      }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('1')
    vm.$el.remove()
    vm.$destroy()
  }
  {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'setting',
        iconPosition: 'right'
      }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
  }
  {
    // mock
    const Constructor = Vue.extend(Button)
    const gbutton = new Constructor({
      propsData: {
        icon: 'setting',
      }
    })
    gbutton.$mount()
    let spy = chai.spy(function () {

    })
    gbutton.$on('click', spy)
    // 希望这个函数被执行，用到mock
    let button = gbutton.$el  // 这个是button
    button.click()
    expect(spy).to.have.been.called()
  }
} catch (error){
  window.errors = [error]
} finally {
  window.errors && window.errors.forEach((error) => {
    console.error(error.message)
  })
}
