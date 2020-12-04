<template>
  <v-app-bar app dark color="primary" :dense="true">
    <v-app-bar-nav-icon @click.stop="() => setDrawerOpen(true)" />
    <v-toolbar-title>X2 Vue</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" @click="setDark" icon>
          <v-icon>{{ darkMode ? 'brightness_7' : 'brightness_4' }}</v-icon>
        </v-btn>
      </template>
      <span>Toggle light / dark theme</span>
    </v-tooltip>
    <settings-button />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          @click="() => $router.push(`/SearchView`).catch((err) => {})"
          icon
        >
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <span>Search</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          @click="() => $router.push(`/`).catch((err) => {})"
          icon
        >
          <v-icon>home</v-icon>
        </v-btn>
      </template>
      <span>x2 Home</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
// https://material.io/resources/icons/?style=baseline
// https://vuetifyjs.com/en/features/theme/
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import SettingsButton from './SettingsButton.vue'
import { getTheme } from '../../utils/appThemes'

export default {
  props: {
    setDrawerOpen: {
      type: Function,
      required: true,
    },
  },
  inject: ['theme'],
  components: {
    SettingsButton,
  },
  computed: {
    ...mapState(['darkMode', 'themeName']),
  },
  methods: {
    ...mapActions(['setDarkModeAsync']),
    setDark() {
      const dark = !this.darkMode
      this.setDarkModeAsync(dark)
      this.$vuetify.theme.dark = dark
    },
  },
  watch: {
    themeName() {
      const theme = getTheme(this.themeName)
      this.$vuetify.theme.themes.dark.primary = theme.primary
      this.$vuetify.theme.themes.dark.secondary = theme.secondary
      this.$vuetify.theme.themes.light.primary = theme.primary
      this.$vuetify.theme.themes.light.secondary = theme.secondary
    },
  },
}
</script>
