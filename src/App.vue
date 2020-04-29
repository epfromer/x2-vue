<template>
  <v-app id="inspire">
    <AppDrawer :open="drawerOpen" :setOpen="(v) => (drawerOpen = v)" />
    <AppToolbar :setDrawerOpen="(v) => (drawerOpen = v)" />
    <v-content>
      <v-container fluid>
        <v-row align="start">
          <v-col>
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
import { mapGetters, mapState, mapMutations } from 'vuex'
import AppDrawer from './components/AppDrawer'
import AppToolbar from './components/AppToolbar'
import AppFooter from './components/AppFooter'

export default {
  name: 'App',
  data: () => ({
    drawerOpen: false,
  }),
  components: {
    AppDrawer,
    AppToolbar,
    AppFooter,
  },
  methods: {
    ...mapMutations(['setSelected']),
  },
  computed: {
    ...mapState(['selected', 'savedEmails']),
  },
}
</script>
