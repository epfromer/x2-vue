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
        { icon: 'home', name: 'Home', route: 'HomeView' },
        { icon: 'search', name: 'Search', route: 'SearchView' },
      ],
      secondaryListItems: [
        { icon: 'autorenew', name: 'Chord', route: 'ChordView' },
        { icon: 'cloud', name: 'Word Cloud', route: 'WordCloudView' },
        {
          icon: 'device_hub',
          name: 'Network Graph',
          route: 'NetworkGraphView',
        },
        {
          icon: 'timeline',
          name: 'Volume Timeline',
          route: 'VolumeTimelineView',
        },
        { icon: 'view_quilt', name: 'Tree Map', route: 'TreeMapView' },
        {
          icon: 'timeline',
          name: 'Event Timeline',
          route: 'EventTimelineView',
        },
        { icon: 'bar_chart', name: 'Bar', route: 'BarView' },
        { icon: 'pie_chart', name: 'Polar', route: 'PolarView' },
        { icon: 'pie_chart', name: 'Pie', route: 'PieView' },
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
