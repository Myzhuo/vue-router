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
 
@ 第三种.
