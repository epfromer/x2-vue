<template>
  <v-navigation-drawer v-model="isOpen" app>
    <v-list>
      <NaviListItem
        icon="mdi-view-dashboard"
        name="Dashboard"
        route="Dashboard"
      />
      <NaviListItem icon="mdi-email" name="Email" route="EmailList" />
      <NaviListItem icon="mdi-magnify" name="Saved Searches" route="Search" />
      <NaviListItem icon="mdi-chart-bar" name="Reports" route="Reports" />
      <v-divider></v-divider>
      <NaviListItem
        icon="mdi-magnify-plus-outline"
        name="2001"
        route="Search"
      />
      <NaviListItem
        icon="mdi-magnify-plus-outline"
        name="From: Ken Lay"
        route="Search"
      />
      <NaviListItem
        icon="mdi-magnify-plus-outline"
        name="text: foo"
        route="Search"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import NaviListItem from './NaviListItem'
export default {
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
