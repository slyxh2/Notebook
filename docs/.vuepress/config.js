module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'JS中的堆栈内存及闭包作用域',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children:
          [
            '/part1/one',
            'part1/two',
            'part1/three',
            'part1/four',
            'part1/five',
            'part1/six',
            'part1/seven',
            'part1/eight',
            'part1/nine',
            'part1/ten',
            'part1/eleven',
            'part1/twelve',
            'part1/thirteen',
            'part1/fourteen',
            'part1/fifteen',
            'part1/sixteen',
          ]
      }, {
        title: '面对对象',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/part2/one',
          '/part2/two',
          '/part2/three',
          '/part2/four'
        ]
      }, {
        title: 'JS 中的异步问题',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/part5/one',
          '/part5/two',
          '/part5/three'
        ]
      },
      {
        title: '其他知识点',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/part3/one',
          '/part3/two',
          '/part3/three',
          '/part3/four',
          '/part3/five',

        ]
      },
      {
        title: '数据结构和算法',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/part4/one',
          '/part4/two',
          '/part4/three',
          '/part4/four',
          '/part4/five',
          '/part4/six'
        ]
      },
      {
        title: 'interview',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/part6/one',
          '/part6/two',
        ]
      }

    ]
  }
}