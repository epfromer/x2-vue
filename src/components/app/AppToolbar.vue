<template>
  <v-app-bar app dark color="primary" :dense="Boolean(densePadding)">
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
import { mapMutations, mapState } from 'vuex'
import SettingsButton from './SettingsButton.vue'

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
    ...mapState(['darkMode', 'densePadding']),
  },
  methods: {
    ...mapMutations(['setVuexState', 'saveAppSettings']),
    // TODO https://vuetifyjs.com/en/features/theme/
    setDark() {
      const dark = !this.darkMode
      this.setVuexState({ k: 'darkMode', v: dark })
      this.saveAppSettings()
      this.$vuetify.theme.dark = dark
    },
  },
}
</script>
