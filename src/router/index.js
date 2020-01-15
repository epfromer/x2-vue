import Vue from 'vue'
import VueRouter from 'vue-router'
import EmailList from '../views/EmailList.vue'
import EmailDetail from '../views/EmailDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/emaillist',
    alias: '/',
    name: 'EmailList',
    component: EmailList
  },
  {
    path: '/emaildetail',
    name: 'EmailDetail',
    component: EmailDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
