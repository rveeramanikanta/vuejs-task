import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import City from '@/components/City'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/city/:cityName',
      component: City
    }, {
      path: "*",
      redirect: "/"
    }
  ]
})