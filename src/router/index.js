import Vue from 'vue'
import VueRouter from 'vue-router'
import EmailList from '../views/EmailList.vue'
import EmailDetail from '../views/EmailDetail.vue'
import Dashboard from '../views/Dashboard.vue'
import Search from '../views/Search.vue'
import Reports from '../views/Reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/emaillist',
    name: 'EmailList',
    component: EmailList,
  },
  {
    path: '/emaildetail/:id',
    name: 'EmailDetail',
    component: EmailDetail,
    props: true,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
