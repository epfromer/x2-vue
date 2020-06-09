<template>
  <v-navigation-drawer v-model="isOpen" app>
    <v-list>
      <NaviListItem
        v-for="item in mainListItems"
        :key="item.name"
        :icon="item.icon"
        :name="item.name"
        :route="item.route"
      />
      <v-divider></v-divider>
      <NaviListItem
        v-for="item in secondaryListItems"
        :key="item.name"
        :icon="item.icon"
        :name="item.name"
        :route="item.route"
      />
      <v-divider></v-divider>
      <NaviListItem
        v-for="item in tertiaryListItems"
        :key="item.name"
        :icon="item.icon"
        :name="item.name"
        :route="item.route"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// https://material.io/resources/icons/?style=baseline
import NaviListItem from '../app/NaviListItem'
export default {
  data() {
    return {
      mainListItems: [
        { icon: 'dashboard', name: 'Dashboard', route: 'DashboardView' },
        { icon: 'email', name: 'Search', route: 'SearchView' },
      ],
      secondaryListItems: [
        { icon: 'pie_chart', name: 'Chord', route: 'ChordView' },
        { icon: 'pie_chart', name: 'Word Cloud', route: 'WordCloudView' },
        { icon: 'pie_chart', name: 'FDT', route: 'FDTView' },
        {
          icon: 'pie_chart',
          name: 'Volume Timeline',
          route: 'VolumeTimelineView',
        },
        { icon: 'pie_chart', name: 'Tree Map', route: 'TreeMapView' },
        {
          icon: 'pie_chart',
          name: 'Event Timeline',
          route: 'EventTimelineView',
        },
      ],
      tertiaryListItems: [
        { icon: 'search', name: 'Saved Searches', route: 'SavedSearchView' },
        { icon: 'find_in_page', name: '2001', route: 'Search' },
        { icon: 'find_in_page', name: '"From: Ken Lay', route: 'Search' },
        { icon: 'find_in_page', name: 'text: foo', route: 'Search' },
      ],
    }
  },
  props: {
    open: { type: Boolean, required: true },
    setOpen: { type: Function, required: true },
  },
  components: {
    NaviListItem,
  },
  computed: {
    isOpen: {
      get() {
        return this.open
      },
      set(v) {
        this.setOpen(v)
      },
    },
  },
}
</script>
