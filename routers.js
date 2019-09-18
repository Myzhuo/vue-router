import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: resolve => require(['@/view/login/login.vue'], resolve)
  },
  {
    path: '/redirect/:path*',
    name: 'redirect',
    meta: {
      title: '重定向',
      hideInMenu: true
    },
    component: resolve => require(['@/view/redirect/index.vue'], resolve)
  },
  {
    path: '/order',
    name: 'order',
    component: Main,
    meta: {
      hideInBread: true,
      access: [ '/api/vendor/order:/get' ]
    },
    children: [
      {
        path: 'order_page',
        name: 'order_page',
        meta: {
          icon: 'ios-navigate',
          title: '订单列表'
        },
        component: () => import('@/view/order/order.vue')
      },
      {
        path: 'detail_page',
        name: 'detail_page',
        meta: {
          icon: 'ios-navigate',
          hideInMenu: true,
          title: '订单详情'
        },
        component: resolve => require(['@/view/order/detail.vue'], resolve)
      }
    ]
  },
  {
    path: '/refund',
    name: 'refund_manager',
    component: Main,
    meta: {
      hideInBread: true,
      access: [ '/api/vendor/refund:/get' ]
    },
    children: [
      {
        path: 'list',
        name: 'refund_list',
        meta: {
          icon: 'ios-navigate',
          title: '退货管理'
        },
        component: resolve => require(['@/view/order/refund.vue'], resolve)
      }
    ]
  },
  {
    path: '/repay',
    name: 'repay_manager',
    component: Main,
    meta: {
      hideInBread: true,
      access: [ '/api/vendor/repayOrder:/get' ]
    },
    children: [
      {
        path: 'list',
        name: 'repay_list',
        meta: {
          icon: 'ios-navigate',
          title: '还款管理'
        },
        component: resolve => require(['@/view/order/repay.vue'], resolve)
      }
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: resolve => require(['@/view/reports/vendorOrder.vue'], resolve)
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    component: Main,
    meta: {
      hideInBread: true,
      icon: 'ios-navigate',
      title: '商品管理',
      access: [ '/view/goods/manager' ]
    },
    children: [
      {
        path: 'goods_page',
        name: 'goods_page',
        meta: {
          icon: 'ios-navigate',
          title: '商品列表',
          access: ['/api/vendor/goods:/get']
        },
        component: resolve => require(['@/view/goods/goods.vue'], resolve)
      },
      {
        path: 'goods_cat',
        name: 'goods_cat',
        meta: {
          icon: 'ios-navigate',
          title: '商品分类',
          access: [ '/view/goods/manager' ]
        },
        component: resolve => require(['@/view/goods/cat.vue'], resolve)
      }
    ]
  },
  {
    path: '/agent',
    name: 'agent',
    component: Main,
    meta: {
      hideInBread: true,
      access: [ '/api/vendor/agent:/get' ]
    },
    children: [
      {
        path: 'agent_page',
        name: 'agent_page',
        meta: {
          icon: 'ios-navigate',
          title: '代理商管理'
        },
        component: resolve => require(['@/view/agent/agent.vue'], resolve)
      }
    ]
  },
  {
    path: '/reports',
    name: 'reports',
    component: Main,
    meta: {
      icon: 'ios-navigate',
      title: '报表管理',
      hideInBread: true,
      access: [ '/view/report/manager' ]
    },
    children: [
      {
        path: 'vendor_order',
        name: 'report_vendor_order',
        meta: {
          icon: 'ios-navigate',
          title: '订单总汇',
          access: [ '/api/vendor/orderReportList:/get' ]
        },
        component: resolve => require(['@/view/reports/vendorOrder.vue'], resolve)
      },
      {
        path: 'goods',
        name: 'report_goods',
        meta: {
          icon: 'ios-navigate',
          title: '商品统计',
          access: [ '/api/vendor/goodsReportList:/get' ]
        },
        component: resolve => require(['@/view/reports/goods.vue'], resolve)
      },
      {
        path: 'agnet_order',
        name: 'report_agnet_order',
        meta: {
          icon: 'ios-navigate',
          title: '代理商订单统计',
          access: [ '/api/vendor/agentReportList:/get' ]
        },
        component: resolve => require(['@/view/reports/agentOrder.vue'], resolve)
      },
      {
        path: 'statement',
        name: 'report_statement',
        meta: {
          icon: 'ios-navigate',
          title: '代理商交易流水',
          access: [ '/api/vendor/flowRecordList:/get' ]
        },
        component: resolve => require(['@/view/reports/statement.vue'], resolve)
      },
      {
        path: 'debt',
        name: 'report_debt',
        meta: {
          icon: 'ios-navigate',
          title: '代理商欠款报表',
          access: [ '/api/vendor/agentInfoRecordList:/get' ]
        },
        component: resolve => require(['@/view/reports/debt.vue'], resolve)
      }
    ]
  },
  {
    path: '/',
    name: 'groups',
    component: Main,
    meta: {
      icon: 'ios-navigate',
      title: '用户管理',
      access: [ '/view/user/manager' ]
    },
    children: [
      {
        path: 'user/list',
        name: 'user_list',
        meta: {
          icon: 'ios-navigate',
          title: '用户列表',
          access: [ '/api/vendor/vendorUser:/get' ]
        },
        component: () => import('@/view/user/list.vue')
      },
      {
        path: 'role/list',
        name: 'role_list',
        meta: {
          icon: 'ios-navigate',
          title: '角色管理',
          access: [ '/api/auth/rolePermission:/get' ]
        },
        component: () => import('@/view/role/list.vue')
      },
      {
        path: 'Printer/Printer',
        name: 'Printer',
        meta: {
          icon: 'ios-navigate',
          title: '发货地址&IP地址',
          access: [ '/api/auth/rolePermission:/get' ]
        },
        component: () => import('@/view/Printer/Printer.vue')
      },
      {
        path: 'Postage/Postage',
        name: 'Postage',
        meta: {
          icon: 'ios-navigate',
          title: '邮费模板',
          access: [ '/api/auth/rolePermission:/get' ]
        },
        component: () => import('@/view/Postage/Postage.vue')
      }
    ]
  },
  {
    path: '/dev',
    name: 'dev',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'set',
        name: 'dev_set',
        meta: {
          icon: 'ios-navigate',
          title: '开发设置'
        },
        component: resolve => require(['@/view/set/dev.vue'], resolve)
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: resolve => require(['@/view/single-page/message/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: resolve => require(['@/view/error-page/401.vue'], resolve)
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: resolve => require(['@/view/error-page/500.vue'], resolve)
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: resolve => require(['@/view/error-page/404.vue'], resolve)
  }
]
