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
import NaviListItem from './NaviListItem'
export default {
  data() {
    return {
      mainListItems: [
        { icon: 'dashboard', name: 'Dashboard', route: 'Dashboard' },
        { icon: 'email', name: 'Email', route: 'EmailList' },
        { icon: 'search', name: 'Saved Searches', route: 'Search' },
        { icon: 'assessment', name: 'Reports', route: 'Reports' },
      ],
      secondaryListItems: [
        { icon: 'search', name: '2001', route: 'Search' },
        { icon: 'search', name: '"From: Ken Lay', route: 'Search' },
        { icon: 'search', name: 'text: foo', route: 'Search' },
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
