import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SinglePage from './views/SinglePage.vue'
import MobileAuth from './views/MobileAuth.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/single',
      name: 'single',
      component: SinglePage
    },
    {
      path: '/mauth',
      name: 'mauth',
      component: MobileAuth
    }
  ]
})
