const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {

  it('存在.', () => {
    expect(Popover).to.be.ok // 非falsy就是ok的
  })
  it('可以设置 position.', (done) => {
    Vue.component('g-popover', Popover)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <g-popover position="bottom" ref="a">
      <template slot="content">
        弹出内容
      </template>
      <button>点我</button>
    </g-popover>
    `
    const vm = new Vue({ // 这个vm不是组件，这个vm是一个div对应的实例,div里面才是popover组件
      el: div
    })
    vm.$el.querySelector('button').click()
    vm.$nextTick(() => {
      const {contentWrapper} = vm.$refs.a.$refs
      expect(contentWrapper.classList.contains('position-top')).to.be.false
      done()
    })
  })
  xit('可以设置 trigger.', (done) => {
    Vue.component('g-popover', Popover)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <g-popover trigger="hover" ref="a">
      <template slot="content">
        弹出内容
      </template>
      <button>点我</button>
    </g-popover>
    `
    const vm = new Vue({ // 这个vm不是组件，这个vm是一个div对应的实例,div里面才是popover组件
      el: div
    })
    let event = new Event('mouseenter');
    vm.$el.dispatchEvent(event)
    vm.$nextTick(() => {
      const {contentWrapper} = vm.$refs.a.$refs
      expect(contentWrapper).to.be.exist
      done()
    })
  })
});

