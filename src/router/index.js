import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import login from '@/components/Login'
import list from '@/components/list'
import gwc from '@/components/gwc'
import kaoqin from '@/components/kaoqin'
import kecheng from '@/components/kecheng'
import huizong from '@/components/huizong'
import student from '@/components/student'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/kaoqin',
      name: 'kaoqin',
      component: kaoqin
    },
    {
      path: '/huizong',
      name: 'huizong',
      component: huizong
    },
    {
      path: '/kecheng',
      name: 'kecheng',
      component: kecheng
    },
    {
      path: '/student',
      name: 'student',
      component: student
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/gwc',
      name:'gwc',
      component: gwc
    }
  ]
})
