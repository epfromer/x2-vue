<template>
  <v-app-bar app dark color="primary" :dense="Boolean(densePadding)">
    <v-app-bar-nav-icon @click.stop="() => setDrawerOpen(true)" />
    <v-toolbar-title>X2 Vue</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="setDark" icon>
      <v-icon>{{ darkMode ? 'brightness_high' : 'brightness_low' }}</v-icon>
    </v-btn>
    <v-btn @click="() => $router.push(`/settings`).catch((err) => {})" icon>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
// import colors from 'vuetify/lib/util/colors'

export default {
  props: {
    setDrawerOpen: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState(['darkMode', 'densePadding']),
  },
  methods: {
    ...mapMutations(['setVuexState', 'saveAppSettings']),
    setDark() {
      const dark = !this.darkMode
      this.setVuexState({ k: 'darkMode', v: dark })
      this.saveAppSettings()
      this.$vuetify.theme.dark = dark
    },
  },
}
</script>
