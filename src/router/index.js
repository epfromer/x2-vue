import Vue from 'vue'
import VueRouter from 'vue-router'
import AppSettingsView from '../views/AppSettingsView.vue'
import ChordView from '../views/ChordView.vue'
import DashboardView from '../views/DashboardView.vue'
import EmailDetailView from '../views/EmailDetailView.vue'
import FDTView from '../views/FDTView.vue'
import SavedSearchView from '../views/SavedSearchView.vue'
import SearchView from '../views/SearchView.vue'
import SerpentineView from '../views/SerpentineView.vue'
import TimelineView from '../views/TimelineView.vue'
import TreeMapView from '../views/TreeMapView.vue'
import WordCloudView from '../views/WordCloudView.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/SavedSearchView',
    name: 'SavedSearchView',
    component: SavedSearchView,
  },
  { path: '/ChordView', name: 'ChordView', component: ChordView },
  { path: '/FDTView', name: 'FDTView', component: FDTView },
  { path: '/WordCloudView', name: 'WordCloudView', component: WordCloudView },
  { path: '/TimelineView', name: 'TimelineView', component: TimelineView },
  { path: '/TreeMapView', name: 'TreeMapView', component: TreeMapView },
  {
    path: '/SerpentineView',
    name: 'SerpentineView',
    component: SerpentineView,
  },
  { path: '/', name: 'DashboardView', component: DashboardView },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
