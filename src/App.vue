<template>
  <v-app id="inspire">
    <AppDrawer :open="drawerOpen" :setOpen="(v) => (drawerOpen = v)" />
    <AppToolbar :setDrawerOpen="(v) => (drawerOpen = v)" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppDrawer from './components/app/AppDrawer'
import AppToolbar from './components/app/AppToolbar'
import AppFooter from './components/app/AppFooter'

export default {
  name: 'App',
  data: () => ({
    drawerOpen: false,
  }),
  mounted() {
    this.getInitialDataAsync()
  },
  components: {
    AppDrawer,
    AppToolbar,
    AppFooter,
  },
  methods: {
    ...mapActions(['getInitialDataAsync']),
  },
}
</script>
