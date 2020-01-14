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

const expect = chai.expect
// 单元测试
{
  const Constructor = Vue.extend(Button)
  const button = new Constructor({
    propsData: {
      icon: 'setting'
    }
  })
  button.$mount() // 挂到内存
  // button.$mount('#test') // 直接挂到dom
  let useElement = button.$el.querySelector('use')
  console.log(useElement)
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
  gbutton.$on('click', function () {
    console.log(1)
  })
  // 希望这个函数被执行，用到mock
  let button = gbutton.$el  // 这个是button
  button.click()
}
