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
import { mapState, mapActions, mapMutations } from 'vuex'
import AppDrawer from './components/app/AppDrawer'
import AppToolbar from './components/app/AppToolbar'
import { getTheme } from '@/utils/appThemes'

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
  computed: {
    ...mapState(['darkMode', 'themeName']),
  },
  methods: {
    ...mapActions([
      'getInitialDataAsync',
      'getEmailAsync',
      'loadAppSettingsAsync',
    ]),
  },
  watch: {
    darkMode(setting) {
      this.$vuetify.theme.dark = setting
    },
    themeName(setting) {
      const theme = getTheme(setting)
      this.$vuetify.theme.themes.dark.primary = theme.primary
      this.$vuetify.theme.themes.dark.secondary = theme.secondary
      this.$vuetify.theme.themes.light.primary = theme.primary
      this.$vuetify.theme.themes.light.secondary = theme.secondary
    },
  },
}
</script>
