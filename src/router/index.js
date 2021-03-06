import Vue from 'vue'
import VueRouter from 'vue-router'
import AppSettingsView from '../views/AppSettingsView.vue'
import BarView from '../views/BarView.vue'
import ChordView from '../views/ChordView.vue'
import EmailDetailView from '../views/EmailDetailView.vue'
import EventTimelineView from '../views/EventTimelineView.vue'
import HomeView from '../views/HomeView.vue'
import NetworkGraphView from '../views/NetworkGraphView.vue'
import PieView from '../views/PieView.vue'
import SearchHistoryView from '../views/SearchHistoryView.vue'
import SearchView from '../views/SearchView.vue'
import TreeMapView from '../views/TreeMapView.vue'
import VolumeTimelineView from '../views/VolumeTimelineView.vue'
import WordCloudView from '../views/WordCloudView.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/AppSettingsView',
    name: 'AppSettingsView',
    component: AppSettingsView,
  },
  { path: '/SearchView', name: 'SearchView', component: SearchView },
  {
    path: '/EmailDetailView/:id',
    name: 'EmailDetailView',
    component: EmailDetailView,
    props: true,
  },
  {
    path: '/SearchHistoryView',
    name: 'SearchHistoryView',
    component: SearchHistoryView,
  },
  { path: '/ChordView', name: 'ChordView', component: ChordView },
  { path: '/PieView', name: 'PieView', component: PieView },
  {
    path: '/NetworkGraphView',
    name: 'NetworkGraphView',
    component: NetworkGraphView,
  },
  { path: '/WordCloudView', name: 'WordCloudView', component: WordCloudView },
  {
    path: '/VolumeTimelineView',
    name: 'VolumeTimelineView',
    component: VolumeTimelineView,
  },
  { path: '/TreeMapView', name: 'TreeMapView', component: TreeMapView },
  {
    path: '/EventTimelineView',
    name: 'EventTimelineView',
    component: EventTimelineView,
  },
  {
    path: '/BarView',
    name: 'BarView',
    component: BarView,
  },
  { path: '/', name: 'HomeView', component: HomeView },
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

export default router
