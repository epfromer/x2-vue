<template>
  <v-app id="inspire">
    <AppDrawer :open="drawerOpen" :setOpen="(v) => (drawerOpen = v)" />
    <AppToolbar :setDrawerOpen="(v) => (drawerOpen = v)" />
    <v-content>
      <router-view />
    </v-content>
    <AppFooter />
  </v-app>
</template>

<script>
// TODO login/out, as with bikes
import { mapActions, mapState } from 'vuex'
import AppDrawer from './components/app/AppDrawer'
import AppToolbar from './components/app/AppToolbar'
import AppFooter from './components/app/AppFooter'

export default {
  name: 'App',
  data: () => ({
    drawerOpen: false,
  }),
  mounted() {
    this.fetchEmailSentIfNeeded()
    this.fetchWordCloudIfNeeded()
    this.fetchContactsIfNeeded()
  },
  components: {
    AppDrawer,
    AppToolbar,
    AppFooter,
  },
  methods: {
    ...mapActions([
      'fetchEmailSentIfNeeded',
      'fetchWordCloudIfNeeded',
      'fetchContactsIfNeeded',
    ]),
  },
}
</script>
