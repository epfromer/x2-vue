<template>
  <v-app id="inspire">
    <AppDrawer :open="drawerOpen" :setOpen="(v) => (drawerOpen = v)" />
    <AppToolbar :setDrawerOpen="(v) => (drawerOpen = v)" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppDrawer from './components/app/AppDrawer'
import AppToolbar from './components/app/AppToolbar'

export default {
  name: 'App',
  data: () => ({
    drawerOpen: false,
  }),
  mounted() {
    this.getInitialDataAsync()
    this.getEmailAsync()
    this.loadAppSettingsAsync()
  },
  components: {
    AppDrawer,
    AppToolbar,
  },
  methods: {
    ...mapActions([
      'getInitialDataAsync',
      'getEmailAsync',
      'loadAppSettingsAsync',
    ]),
  },
}
</script>
