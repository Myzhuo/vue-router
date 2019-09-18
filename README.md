# vue-router
VUE vue-router 的几种写法

@ 第一种就是直接从引进来。
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        title:'登录'
      }
    }
  ]
})
/***/*
@ 第二种就是用模块的形式。 在components下新建一个文件夹 叫做main
@ main/index.js  //把已经拆开的组件放进来

  import Main from './main.vue'
  export default Main
  
  /****/*
 @router/index.js
 
  import Vue from 'vue'
  import Router from 'vue-router'
  import routes from './routers'
  import iView from 'iview'
  import { getToken, setTitle } from '@/libs/util'
  import config from '@/config'
  const { homeName } = config

  Vue.use(Router)
  const router = new Router({
    routes,
    mode: 'history'
  })
  const LOGIN_PAGE_NAME = 'login'

  router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    const token = getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: homeName // 跳转到homeName页
      })
    } else {
      next()
    }
  })
  router.afterEach(to => {
    setTitle(to, router.app)
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
  })
  export default router
  /****/
 @ router/routers.js
 import Main from '@/components/main' 
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
  }
  ]
 
@ 第三种.
