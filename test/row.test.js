const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/row'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {

  // BDD 行为驱动测试

  it('存在.', () => {
    expect(Row).to.exist// 非falsy就是ok的
  })

});
