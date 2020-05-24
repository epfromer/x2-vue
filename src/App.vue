<template>
  <v-app id="inspire">
    <AppDrawer :open="drawerOpen" :setOpen="(v) => (drawerOpen = v)" />
    <AppToolbar :setDrawerOpen="(v) => (drawerOpen = v)" />
    <v-content>
      <v-container fluid>
        <v-row align="start">
          <v-col>
            {{ this.wordCloud }}
            <router-view />
          </v-col>
        </v-row>
      </v-container>
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
    this.fetchWordCloudIfNeeded()
  },
  components: {
    AppDrawer,
    AppToolbar,
    AppFooter,
  },
  computed: {
    ...mapState(['wordCloud']),
  },
  methods: { ...mapActions(['fetchWordCloudIfNeeded']) },
}
</script>
