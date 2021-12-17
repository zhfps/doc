module.exports = {
     // 打包目录
    title: '一只程序汪的成长之路',
    description: '闲来无事记文章.',
    head: [
        // 添加图标
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
     // 主题配置
     themeConfig: {
        // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        // lastUpdated: 'Last Updated', // string | boolean
        // 启动页面丝滑滚动
        smoothScroll: true,
        // 导航栏配置
        nav:[
            {text: '我的个人网站', link: '#' },
            {text: 'Gitee', link: '#'},
            {text: 'Github', link: '#'}
        ],
        sidebar:{
            '/':getSidebar()
        }
    }
  }

  function getSidebar() {
    return [
        {
            text:'Vue',
            children: [
                { text: 'Vue基础篇', link: '/vue-doc/' },
            ],
            sidebarDepth:1
        },
        {
            text:'React',
            children: [
                { text: 'React基础篇', link: '/react-doc/' },
            ],
            sidebarDepth:3
        },
        {
            text:'SpringBoot',
            children: [
                {
                    text:'springboot',
                    children: [
                        { text: 'springboot', link: '/springboot-doc/springboot/' },
                    ],
                    sidebarDepth:3
                },
                {
                    text:'LogBack',
                    children: [
                        { text: 'logback配置实例', link: '/springboot-doc/logback/' },
                    ],
                    sidebarDepth:3
                },
                {
                    text:'security',
                    children: [
                        { text: 'spring-security', link: '/springboot-doc/security/spring-security/' },
                    ],
                    sidebarDepth:1
                }, {
                    text:'mybatis',
                    children: [
                        { text: 'mybatis', link: '/springboot-doc/mybatis/' },
                    ],
                    sidebarDepth:1
                },
            ],
            sidebarDepth:1
        },
        {
            text:'工具',
            children: [
                {
                    text:'Vite',
                    children: [
                        { text: 'Vite使用', link: '/vite-doc/' },
                    ],
                    sidebarDepth:3
                }
            ],
            sidebarDepth:1
        },
        {
            text:'数据库',
            children: [
                {
                    text:'MySql',
                    children: [
                        { text: 'MySql范例', link: '/mysql-doc/' },
                    ],
                    sidebarDepth:3
                }
            ],
            sidebarDepth:1
        },
        {
            text:'包管理工具',
            children: [
                {
                    text:'Yarn',
                    children: [
                        { text: 'yarn学习记录', link: '/yarn-doc/' },
                    ],
                    sidebarDepth:3
                }
            ],
            sidebarDepth:1
        },
    ]
}