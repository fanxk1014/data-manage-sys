import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Check from '@/components/check/Check'
import History from '@/components/check/History'
import Library from '@/components/library/Library'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {path:'/',name:'Check',component:Check},
        {path:'/history',name:'History',component:History},
        {path:'/library',name:'Library',component:Library}
      ]
    }
  ]
})
