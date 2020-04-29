<template>
  <div>
    <div class="display-1">Settings</div>
    <v-switch
      v-model="dense"
      class="mx-2"
      color="secondary"
      label="Dense padding"
    ></v-switch>
    <div class="headline">Interface element colors</div>
    <v-switch
      v-model="dark"
      class="mx-2"
      color="secondary"
      label="Dark mode"
    ></v-switch>
    <ColorPicker
      :defaultColor="themePrimaryColor"
      :onChange="(c) => handlePrimaryColorChange(c)"
    />
    <ColorPicker
      :defaultColor="themeSecondaryColor"
      :onChange="(c) => handleSecondaryColorChange(c)"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ColorPicker from '../components/ColorPicker'

export default {
  components: {
    ColorPicker,
  },
  methods: {
    ...mapMutations(['setVuexState', 'saveAppSettings']),
    handlePrimaryColorChange(color) {
      this.setVuexState({ k: 'themePrimaryColor', v: color })
      this.saveAppSettings()
      this.$vuetify.theme.themes.dark.primary = color
      this.$vuetify.theme.themes.light.primary = color
    },
    handleSecondaryColorChange(color) {
      this.setVuexState({ k: 'themeSecondaryColor', v: color })
      this.saveAppSettings()
      this.$vuetify.theme.themes.dark.secondary = color
      this.$vuetify.theme.themes.light.secondary = color
    },
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
  },
}
</script>
