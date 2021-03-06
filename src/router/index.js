import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import login from '@/components/Login'
import gwc from '@/components/gwc'
import kaoqin from '@/components/kaoqin'
import kecheng from '@/components/kecheng'
import huizong from '@/components/huizong'
import student from '@/components/student'
import time from "../../api/time1.js"
import dateTime from "../../api/time.js"
//  Vue.filter("dateFormatHHmm",dateTime["dateFormatHHmm"]);
//  Vue.filter("dateFormatYYmmdd",dateTime["dateFormatYYmmdd"]);
for(let key in dateTime){
  Vue.filter(key,dateTime[key]);
}

Vue.use(Router);
export default new Router({
  routes: [
    {
      path:"/",
      component:()=>import("@/components/index1.vue"),
      children:[
        {
          path: '/index1',
          name: 'index',
          component: Index,
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
          path:'/gwc',
          name:'gwc',
          component: gwc
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    
  ]
})
