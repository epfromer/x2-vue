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

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
// TODO login/out, as with bikes
// TODO dark mode toggle
import { mapGetters, mapState, mapMutations } from 'vuex'
import AppDrawer from './components/AppDrawer'
import AppToolbar from './components/AppToolbar'

export default {
  name: 'App',
  data: () => ({
    drawerOpen: false,
  }),
  components: {
    AppDrawer,
    AppToolbar,
  },
  methods: {
    ...mapMutations(['setSelected']),
  },
  computed: {
    ...mapState(['selected', 'savedEmails']),
  },
}
</script>
