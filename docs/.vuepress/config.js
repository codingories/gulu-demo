module.exports = {
  base:'/ories-test-1/',
  title: '轱辘UI',
  description: '一个好用的UI框架',
    themeConfig: {
      sidebar: [
        {
          title: '入门',
          children: [
            '/install/',
            '/get-started/',
          ]
        },
        {
          title:'组件',
          children: [
            '/components/button',
            '/components/popover',
            '/components/input',
            '/components/grid',
            '/components/layout',
            '/components/toast',
            '/components/tabs',
          ]
        }
      ]
    }
}
