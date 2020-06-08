import Vue from 'vue'
import VueRouter from 'vue-router'
import AppSettingsView from '../views/AppSettingsView.vue'
import ChordView from '../views/ChordView.vue'
import DashboardView from '../views/DashboardView.vue'
import EmailDetailView from '../views/EmailDetailView.vue'
import FDTView from '../views/FDTView.vue'
import SavedSearchView from '../views/SavedSearchView.vue'
import SearchView from '../views/SearchView.vue'
import VerticalEventTimelineView from '../views/VerticalEventTimelineView.vue'
import VolumeTimelineView from '../views/VolumeTimelineView.vue'
import TreeMapView from '../views/TreeMapView.vue'
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
    path: '/SavedSearchView',
    name: 'SavedSearchView',
    component: SavedSearchView,
  },
  { path: '/ChordView', name: 'ChordView', component: ChordView },
  { path: '/FDTView', name: 'FDTView', component: FDTView },
  { path: '/WordCloudView', name: 'WordCloudView', component: WordCloudView },
  {
    path: '/VolumeTimelineView',
    name: 'VolumeTimelineView',
    component: VolumeTimelineView,
  },
  { path: '/TreeMapView', name: 'TreeMapView', component: TreeMapView },
  {
    path: '/VerticalEventTimelineView',
    name: 'VerticalEventTimelineView',
    component: VerticalEventTimelineView,
  },
  { path: '/', name: 'DashboardView', component: DashboardView },
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
