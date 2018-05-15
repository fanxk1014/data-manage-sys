import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Check from '@/components/check/Check'
import History from '@/components/check/History'
import Library from '@/components/library/Library'
import Detail from '@/components/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children:[
        {
          path:'/',
          component:Check,
          children:[
            {
              path:'/',
              component:Detail
            }
          ]
        },
        {
          path:'/history',
          component:History,
          children:[
            {
              path:'/',
              component:Detail
            }
          ]
        },
        {path:'/library',name:'Library',component:Library}
      ]
    }
  ]
})
