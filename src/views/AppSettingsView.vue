<template>
  <v-container fluid>
    <div class="headline">Settings</div>
    <v-switch
      v-model="dense"
      class="mx-2"
      color="secondary"
      label="Dense padding tables"
    ></v-switch>
    <div class="headline">Interface element colors</div>
    <v-switch
      v-model="dark"
      class="mx-2"
      color="secondary"
      label="Dark mode"
    ></v-switch>
    <v-row>
      <v-col cols="12" sm="6">
        <div>
          <div class="headline">Primary</div>
          <v-color-picker class="ma-2" v-model="primaryColor" show-swatches />
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div>
          <div class="headline">Secondary</div>
          <v-color-picker class="ma-2" v-model="secondaryColor" show-swatches />
        </div>
      </v-col>
    </v-row>
    <div class="headline">Enron Key Contacts</div>
    <ContactSettings />
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ColorPicker from '../components/ColorPicker'
import ContactSettings from '../components/ContactSettings'

export default {
  components: {
    // ColorPicker,
    ContactSettings,
  },
  methods: {
    ...mapMutations(['setVuexState', 'saveAppSettings']),
  },
  computed: {
    ...mapState([
      'densePadding',
      'darkMode',
      'themePrimaryColor',
      'themeSecondaryColor',
    ]),
    dense: {
      get() {
        return this.densePadding
      },
      set(v) {
        this.setVuexState({ k: 'densePadding', v })
        this.saveAppSettings()
      },
    },
    dark: {
      get() {
        return this.darkMode
      },
      set(v) {
        this.setVuexState({ k: 'darkMode', v })
        this.saveAppSettings()
        this.$vuetify.theme.dark = v
      },
    },
    primaryColor: {
      get() {
        return this.themePrimaryColor
      },
      set(color) {
        this.setVuexState({ k: 'themePrimaryColor', v: color })
        this.saveAppSettings()
        this.$vuetify.theme.themes.dark.primary = color
        this.$vuetify.theme.themes.light.primary = color
      },
    },
    secondaryColor: {
      get() {
        return this.themeSecondaryColor
      },
      set(color) {
        this.setVuexState({ k: 'themeSecondaryColor', v: color })
        this.saveAppSettings()
        this.$vuetify.theme.themes.dark.secondary = color
        this.$vuetify.theme.themes.light.secondary = color
      },
    },
  },
}
</script>
