import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import EmailDetail from '../views/EmailDetail.vue'
import EmailList from '../views/EmailList.vue'
import Reports from '../views/Reports.vue'
import Search from '../views/Search.vue'
import AppSettings from '../views/AppSettings.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/settings', name: 'Settings', component: AppSettings },
  { path: '/emaillist', name: 'EmailList', component: EmailList },
  {
    path: '/emaildetail/:id',
    name: 'EmailDetail',
    component: EmailDetail,
    props: true,
  },
  { path: '/reports', name: 'Reports', component: Reports },
  { path: '/search', name: 'Search', component: Search },
  { path: '/', name: 'Dashboard', component: Dashboard },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
